import crypto from 'node:crypto'
import type { Endpoint, PayloadRequest } from 'payload'
import { OAuth2Plugin } from 'payload-oauth2'

import { env } from '../env'

const STATE_COOKIE = 'payload-oidc-state'
const CALLBACK_PATH = '/api/users/oauth'

// Authentik serves authorize/token/userinfo globally under /application/o/, not per application.
const authentik = (path: string) => `${new URL(env.oidc.issuer || 'https://invalid.local').origin}/application/o/${path}/`

const cookieValue = (req: PayloadRequest, name: string) =>
  req.headers
    .get('cookie')
    ?.split(';')
    .map((c) => c.trim().split('='))
    .find(([k]) => k === name)?.[1]

const stateCookie = (value: string, maxAge: number) =>
  [
    `${STATE_COOKIE}=${value}`,
    `Path=${CALLBACK_PATH}`,
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
    env.serverURL.startsWith('https://') ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ')

// payload-oauth2 forwards ?state but never checks it; this endpoint and extractCode add the CSRF check.
export const oidcStartEndpoint: Endpoint = {
  path: '/oauth/start',
  method: 'get',
  handler: () => {
    const state = crypto.randomBytes(24).toString('base64url')
    return new Response(null, {
      status: 302,
      headers: {
        'Set-Cookie': stateCookie(state, 600),
        Location: `${env.serverURL}/api/users/oauth/authorize?state=${state}`,
      },
    })
  },
}

const extractCode = async (req: PayloadRequest): Promise<string> => {
  const state = req.searchParams.get('state')
  const expected = cookieValue(req, STATE_COOKIE)
  if (
    !state ||
    !expected ||
    state.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(state), Buffer.from(expected))
  ) {
    throw new Error('OIDC state mismatch')
  }
  const code = req.searchParams.get('code')
  if (!code) throw new Error('OIDC callback without code')
  return code
}

type UserInfo = { sub?: string; preferred_username?: string; name?: string; email?: string }

// Identity is the immutable `sub`; Authentik users can edit their email, so it is stored for display only.
const getUserInfo = async (accessToken: string) => {
  const res = await fetch(authentik('userinfo'), {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`userinfo HTTP ${res.status}`)
  const info = (await res.json()) as UserInfo
  if (!info.sub) throw new Error('userinfo without sub')
  return {
    sub: info.sub,
    username: info.preferred_username ?? null,
    name: info.name || info.preferred_username || null,
    contactEmail: info.email ?? null,
    // Synthetic login email: SSO users can never receive a password-reset mail or log in locally.
    email: `${info.sub.slice(0, 48)}@sso.invalid`,
  }
}

export const oidcPlugin = () =>
  OAuth2Plugin({
    enabled: env.oidc.enabled,
    strategyName: 'authentik',
    authCollection: 'users',
    useEmailAsIdentity: false,
    serverURL: env.serverURL,
    clientId: env.oidc.clientId,
    clientSecret: env.oidc.clientSecret,
    providerAuthorizationUrl: authentik('authorize'),
    tokenEndpoint: authentik('token'),
    scopes: ['openid', 'profile', 'email'],
    onUserNotFoundBehavior: 'create',
    callbackExtractToken: extractCode,
    getUserInfo,
    successRedirect: () => `${env.serverURL}/admin`,
    failureRedirect: (req, err) => {
      req.payload.logger.warn({ err }, 'OIDC login failed')
      return `${env.serverURL}/admin/login?sso=failed`
    },
  })
