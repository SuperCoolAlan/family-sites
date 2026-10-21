import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import type { LocalizationConfig } from 'payload'

const locales = [
  // Fallbacks only apply when a request names its ?locale=; without one Payload returns bare es values.
  { code: 'es', label: 'Español', fallbackLocale: 'en' },
  { code: 'en', label: 'English', fallbackLocale: 'es' },
]

export const localeOptions = locales.map(({ code, label }) => ({ value: code, label }))

export const localization: LocalizationConfig = {
  locales,
  defaultLocale: 'es',
  fallback: true,
  // Admin language picker shows only the selected tenant's languages; the API still serves every locale.
  filterAvailableLocales: async ({ locales, req }) => {
    const id = getTenantFromCookie(req.headers, req.payload.db.defaultIDType)
    if (!id) return locales
    const tenant = await req.payload
      .findByID({ collection: 'tenants', id, depth: 0, overrideAccess: true })
      .catch(() => null)
    const langs = tenant?.languages ?? []
    const shown = locales.filter((l) => langs.includes(l.code as 'es' | 'en'))
    return shown.length ? shown : locales
  },
}
