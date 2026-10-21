import type { Form, Media, Page, SiteSetting, Tenant } from '@cms-types'

import { LOCALES, type Lang } from '../i18n'
import snapshot from '../content-snapshot.json'
import { fetchContent } from './load-content.mjs'

export type { Form, Media, Page, SiteSetting, Tenant }
export type Block = NonNullable<Page['layout']>[number]

export type LocaleContent = { settings: SiteSetting; pages: Page[]; forms: Form[] }
export type SiteContent = {
  fetchedAt: string
  source: 'cms' | 'snapshot'
  tenant: Tenant
  locales: Record<Lang, LocaleContent>
}

const env = (k: string): string | undefined => process.env[k] ?? (import.meta.env[k] as string | undefined)

let cached: Promise<SiteContent> | undefined

// A homelab outage must never fail a Pages build, so any CMS error falls back to the committed snapshot.
const load = async (): Promise<SiteContent> => {
  const url = env('PAYLOAD_URL')
  const slug = env('TENANT_SLUG') || 'sh-ponies-desserts'
  if (url) {
    try {
      const live = (await fetchContent(url, slug, LOCALES)) as Omit<SiteContent, 'source'>
      console.info(`[cms] loaded ${LOCALES.map((l) => `${live.locales[l].pages.length} ${l}`).join(' + ')} pages for ${slug} from ${url}`)
      return { ...live, source: 'cms' }
    } catch (err) {
      console.warn(`[cms] ${url} unavailable (${(err as Error).message}); using content-snapshot.json`)
    }
  } else {
    console.warn('[cms] PAYLOAD_URL not set; using content-snapshot.json')
  }
  return { ...(snapshot as unknown as Omit<SiteContent, 'source'>), source: 'snapshot' }
}

export const getContent = () => (cached ??= load())

export const getLocale = async (lang: Lang): Promise<LocaleContent> => (await getContent()).locales[lang]

export const isObj = <T extends object>(v: T | number | string | null | undefined): v is T =>
  typeof v === 'object' && v !== null
