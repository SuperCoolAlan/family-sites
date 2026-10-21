import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

// Pages builds take a minute or two; batching edits keeps us well inside the free 500 builds/month.
const DEBOUNCE_MS = 60_000

const timers = new Map<string, NodeJS.Timeout>()

const tenantIdOf = (doc: { tenant?: unknown } | undefined): string | undefined => {
  const t = doc?.tenant
  if (t && typeof t === 'object' && 'id' in t) return String((t as { id: unknown }).id)
  return t == null ? undefined : String(t)
}

const fire = async (payload: Payload, tenantId: string) => {
  timers.delete(tenantId)
  try {
    const tenant = await payload.findByID({ collection: 'tenants', id: tenantId, depth: 0, overrideAccess: true })
    const hook = tenant?.pagesDeployHookUrl
    if (!hook) {
      payload.logger.info(`deploy: tenant ${tenant?.slug ?? tenantId} has no Pages deploy hook, skipping`)
      return
    }
    const res = await fetch(hook, { method: 'POST', signal: AbortSignal.timeout(15_000) })
    payload.logger.info(`deploy: triggered Pages build for ${tenant.slug} (HTTP ${res.status})`)
  } catch (err) {
    payload.logger.error({ err }, `deploy: failed to trigger build for tenant ${tenantId}`)
  }
}

export const scheduleDeploy = (payload: Payload, tenantId: string | undefined) => {
  if (!tenantId) return
  clearTimeout(timers.get(tenantId))
  timers.set(
    tenantId,
    setTimeout(() => void fire(payload, tenantId), DEBOUNCE_MS),
  )
}

// Drafts/autosaves never reach the static site; only publishing or unpublishing should rebuild it.
export const deployAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req, context }) => {
  if (context?.skipDeploy) return doc
  const hasStatus = doc && typeof doc === 'object' && '_status' in doc
  const draftSave = req.query?.draft === 'true' || req.query?.autosave === 'true'
  const unpublished = previousDoc?._status === 'published' && !draftSave
  const live = !hasStatus || doc._status === 'published' || unpublished
  if (live) scheduleDeploy(req.payload, tenantIdOf(doc))
  return doc
}

export const deployAfterDelete: CollectionAfterDeleteHook = ({ doc, req, context }) => {
  if (!context?.skipDeploy) scheduleDeploy(req.payload, tenantIdOf(doc))
  return doc
}
