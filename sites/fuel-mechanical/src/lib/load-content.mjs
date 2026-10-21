// Shared by the Astro build (src/lib/cms.ts) and scripts/snapshot.mjs so both see identical data.

const TIMEOUT_MS = 15_000

const get = async (base, path) => {
  const res = await fetch(`${base}/api/${path}`, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`GET /api/${path} -> HTTP ${res.status}`)
  return res.json()
}

const q = (params) => new URLSearchParams(params).toString()

/** Anonymous reads only: the CMS access rules return published documents and nothing private. */
export async function fetchContent(payloadURL, tenantSlug) {
  const base = payloadURL.replace(/\/+$/, '')
  const tenants = await get(base, `tenants?${q({ 'where[slug][equals]': tenantSlug, limit: '1', depth: '0' })}`)
  const tenant = tenants.docs?.[0]
  if (!tenant) throw new Error(`tenant "${tenantSlug}" not found`)

  const list = async (collection, extra = {}) => {
    const params = { 'where[tenant][equals]': String(tenant.id), limit: '200', depth: '2', ...extra }
    return (await get(base, `${collection}?${q(params)}`)).docs ?? []
  }
  const published = { 'where[_status][equals]': 'published' }

  const [settings, pages, services, projects, forms] = await Promise.all([
    list('site-settings', { limit: '1' }).then((d) => d[0] ?? null),
    list('pages', { ...published, sort: 'navOrder' }),
    list('services', { ...published, sort: 'order' }),
    list('projects', { ...published, sort: '-completedOn' }),
    list('forms', { depth: '0' }),
  ])
  if (!settings) throw new Error('site-settings missing for tenant')
  if (!pages.some((p) => p.slug === 'home')) throw new Error('no published "home" page')

  return { fetchedAt: new Date().toISOString(), tenant, settings, pages, services, projects, forms }
}

const isLocalURL = (u) => typeof u === 'string' && /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/)/.test(u)

/** Drops media that only exists on a dev machine so a committed snapshot never points at localhost. */
export function stripLocalMedia(value) {
  if (Array.isArray(value)) return value.map(stripLocalMedia)
  if (value && typeof value === 'object') {
    if ('mimeType' in value && isLocalURL(value.url)) return null
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, stripLocalMedia(v)]))
  }
  return value
}
