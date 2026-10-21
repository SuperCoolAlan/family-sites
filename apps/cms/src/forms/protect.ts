import type { CollectionBeforeChangeHook, CollectionBeforeOperationHook } from 'payload'
import { APIError } from 'payload'

import { env } from '../env'

const WINDOW_MS = 10 * 60_000
const MAX_PER_WINDOW = 5
const MAX_FIELDS = 30
const MAX_VALUE_LENGTH = 5_000
// Payload only serialises an APIError's message when it carries `data`, so every rejection sets a code.

// In-process limiter: fine for the single-replica Deployment, must move to shared storage if scaled out.
const hits = new Map<string, number[]>()

const clientIP = (headers: Headers): string =>
  headers.get('cf-connecting-ip') ||
  headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  headers.get('x-real-ip') ||
  'unknown'

const rateLimited = (ip: string): boolean => {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 10_000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const verifyTurnstile = async (token: string, ip: string): Promise<boolean> => {
  if (!env.turnstileSecret) return false
  const body = new URLSearchParams({ secret: env.turnstileSecret, response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    signal: AbortSignal.timeout(10_000),
  })
  const json = (await res.json()) as { success?: boolean }
  return json.success === true
}

type SubmissionBody = {
  form?: unknown
  tenant?: unknown
  submissionData?: { field?: unknown; value?: unknown }[]
  turnstileToken?: unknown
  website?: unknown
}

// Runs before access control, so anonymous spam is rejected before touching the DB.
export const protectSubmission: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  if (operation !== 'create' || req.payloadAPI === 'local' || req.user) return args
  const data = (args.data ?? {}) as SubmissionBody

  if (typeof data.website === 'string' && data.website.length > 0) {
    throw new APIError('Submission rejected.', 400, { code: 'honeypot' }, true)
  }
  const rows = Array.isArray(data.submissionData) ? data.submissionData : []
  if (rows.length === 0 || rows.length > MAX_FIELDS) throw new APIError('Invalid submission.', 400, { code: 'invalid' }, true)
  for (const r of rows) {
    if (typeof r?.field !== 'string' || String(r.value ?? '').length > MAX_VALUE_LENGTH) {
      throw new APIError('Invalid submission.', 400, { code: 'invalid' }, true)
    }
  }

  const ip = clientIP(req.headers)
  if (rateLimited(ip)) throw new APIError('Too many submissions, please call us instead.', 429, { code: 'rate_limited' }, true)

  const token = typeof data.turnstileToken === 'string' ? data.turnstileToken : ''
  if (!token || !(await verifyTurnstile(token, ip))) {
    throw new APIError('Spam check failed, please reload the page and try again.', 400, { code: 'turnstile' }, true)
  }
  delete (args.data as SubmissionBody).turnstileToken
  delete (args.data as SubmissionBody).website
  delete (args.data as SubmissionBody).tenant
  return args
}

// beforeChange, not beforeValidate: the plugin's beforeValidate membership check rejects anonymous tenant writes.
export const submissionTenantFromForm: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation !== 'create' || !data?.form) return data
  const formId = typeof data.form === 'object' ? data.form.id : data.form
  const form = await req.payload.findByID({ collection: 'forms', id: formId, depth: 0, overrideAccess: true, req })
  return { ...data, tenant: form.tenant }
}
