import fs from 'fs'
import path from 'path'

import type { CollectionSlug, Payload, Where } from 'payload'

export type Locale = 'es' | 'en'
export type ByLocale<T> = Partial<Record<Locale, T>>
type Data = Record<string, unknown>

// Seeding must not fire Pages deploy hooks; run it, then publish one thing to trigger a build.
export const context = { skipDeploy: true }

const isRow = (v: unknown): v is Data => typeof v === 'object' && v !== null && !Array.isArray(v)

/**
 * Copies array/block row ids from the saved doc onto the next locale's data. Without them Payload
 * replaces the rows, which deletes the other locale's text stored against the old row ids.
 */
export const withIds = (next: unknown, prev: unknown): unknown => {
  if (Array.isArray(next)) {
    const before = Array.isArray(prev) ? prev : []
    return next.map((item, i) => {
      const old = before[i]
      if (!isRow(item) || !isRow(old) || old.id == null || item.blockType !== old.blockType) return withIds(item, undefined)
      return { ...(withIds(item, old) as Data), id: old.id }
    })
  }
  if (isRow(next)) {
    return Object.fromEntries(Object.entries(next).map(([k, v]) => [k, withIds(v, isRow(prev) ? prev[k] : undefined)]))
  }
  return next
}

/** Creates or updates one document, saving each locale in turn (es first) onto the same rows. */
export const upsertLocalized = async (
  payload: Payload,
  collection: CollectionSlug,
  where: Where,
  byLocale: ByLocale<Data>,
  extra: Data = {},
): Promise<Data & { id: number }> => {
  const found = await payload.find({ collection, where, limit: 1, depth: 0, draft: true })
  let doc = found.docs[0] as unknown as (Data & { id: number }) | undefined
  for (const locale of ['es', 'en'] as const) {
    const data = byLocale[locale]
    if (!data) continue
    const body = { ...(withIds(data, doc) as Data), ...extra }
    doc = (
      doc
        ? await payload.update({ collection, id: doc.id, data: body as never, locale, depth: 0, context })
        : await payload.create({ collection, data: body as never, locale, depth: 0, context })
    ) as unknown as Data & { id: number }
  }
  if (!doc) throw new Error(`seed: no locale data for ${collection}`)
  return doc
}

/** Finds a tenant's media by filename, uploading it once; alt text is (re)written for every locale given. */
export const upsertMedia = async (
  payload: Payload,
  tenant: number,
  filePath: string,
  alt: ByLocale<string>,
): Promise<number> => {
  const filename = path.basename(filePath)
  const found = await payload.find({
    collection: 'media',
    where: { and: [{ filename: { equals: filename } }, { tenant: { equals: tenant } }] },
    limit: 1,
    depth: 0,
  })
  const locales = (['es', 'en'] as const).filter((l) => alt[l])
  let id = found.docs[0]?.id
  for (const locale of locales) {
    const data = { alt: alt[locale]!, tenant }
    if (id) {
      await payload.update({ collection: 'media', id, data, locale, depth: 0, context })
    } else {
      if (!fs.existsSync(filePath)) throw new Error(`seed: missing asset ${filePath}`)
      id = (await payload.create({ collection: 'media', data, filePath, locale, depth: 0, context })).id
    }
  }
  if (!id) throw new Error(`seed: no alt text given for ${filename}`)
  return id
}

export const upsertTenant = async (payload: Payload, data: { name: string; slug: string; domain: string; languages: Locale[] }) => {
  const existing = await payload.find({ collection: 'tenants', where: { slug: { equals: data.slug } }, limit: 1, depth: 0 })
  const tenant = existing.docs[0]
    ? await payload.update({ collection: 'tenants', id: existing.docs[0].id, data, context })
    : await payload.create({ collection: 'tenants', data, context })
  return tenant.id
}

export const bySlug = (tenant: number, slug: string): Where => ({
  and: [{ slug: { equals: slug } }, { tenant: { equals: tenant } }],
})

export type Refs = { media: Record<string, number>; services: Record<string, number>; forms: Record<string, number> }
type Slugged = Data & { slug: string }

export type TenantSeed = {
  tenant: { name: string; slug: string; domain: string; languages: Locale[] }
  /** `file` lives in seed/assets; `localFile`, if present in the gitignored seed/assets/local, is used instead. */
  media: { key: string; file: string; localFile?: string; alt: ByLocale<string> }[]
  services?: ByLocale<Slugged>[]
  projects?: ByLocale<Slugged>[]
  forms?: Record<string, ByLocale<Data & { title: string }>>
  settings: (refs: Refs) => ByLocale<Data>
  pages: (refs: Refs) => ByLocale<Slugged>[]
}

const slugOf = (d: ByLocale<Slugged>) => (d.es ?? d.en)!.slug

export const seedTenant = async (payload: Payload, seed: TenantSeed, assets: string) => {
  const t = await upsertTenant(payload, seed.tenant)
  const refs: Refs = { media: {}, services: {}, forms: {} }
  const published = { tenant: t, _status: 'published' }

  for (const m of seed.media) {
    const local = m.localFile && path.join(assets, 'local', m.localFile)
    const file = local && fs.existsSync(local) ? local : path.join(assets, m.file)
    refs.media[m.key] = await upsertMedia(payload, t, file, m.alt)
  }
  for (const s of seed.services ?? []) {
    refs.services[slugOf(s)] = (await upsertLocalized(payload, 'services', bySlug(t, slugOf(s)), s, published)).id
  }
  for (const pr of seed.projects ?? []) {
    await upsertLocalized(payload, 'projects', bySlug(t, slugOf(pr)), pr, published)
  }
  for (const [key, f] of Object.entries(seed.forms ?? {})) {
    const title = (f.es ?? f.en)!.title
    const where: Where = { and: [{ title: { equals: title } }, { tenant: { equals: t } }] }
    refs.forms[key] = (await upsertLocalized(payload, 'forms', where, f, { tenant: t })).id
  }
  await upsertLocalized(payload, 'site-settings', { tenant: { equals: t } }, seed.settings(refs), { tenant: t })
  for (const pg of seed.pages(refs)) {
    await upsertLocalized(payload, 'pages', bySlug(t, slugOf(pg)), pg, published)
  }
  payload.logger.info(`seed: ${seed.tenant.slug} ready (tenant id ${t})`)
  return t
}

const TR = Symbol('tr')
type Tr<V> = { [TR]: true; es: V; en: V }

/** Marks one value as Spanish/English; `bilingual` splits a tree of these into per-locale data. */
export const tr = <V>(es: V, en: V): V => ({ [TR]: true, es, en }) as unknown as V

const resolve = (v: unknown, locale: Locale): unknown => {
  if (Array.isArray(v)) return v.map((x) => resolve(x, locale))
  if (isRow(v)) {
    if (TR in v) return (v as unknown as Tr<unknown>)[locale]
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolve(x, locale)]))
  }
  return v
}

export const bilingual = <T extends Data>(tree: T): ByLocale<T> => ({
  es: resolve(tree, 'es') as T,
  en: resolve(tree, 'en') as T,
})
