import type { CollectionSlug, Field, FieldHook, Where } from 'payload'
import { ValidationError } from 'payload'

const toSlug = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const idOf = (v: unknown): number | string | undefined =>
  v && typeof v === 'object' && 'id' in v ? (v as { id: number | string }).id : (v as number | string | undefined)

const uniquePerTenant =
  (collection: CollectionSlug, from: string): FieldHook =>
  async ({ data, originalDoc, req, value }) => {
    const slug = toSlug(String(value || data?.[from] || ''))
    if (!slug) return value
    const tenant = idOf(data?.tenant) ?? idOf(originalDoc?.tenant)
    const where: Where[] = [{ slug: { equals: slug } }]
    if (tenant) where.push({ tenant: { equals: tenant } })
    if (originalDoc?.id) where.push({ id: { not_equals: originalDoc.id } })
    const dupes = await req.payload.find({
      collection,
      where: { and: where },
      limit: 1,
      depth: 0,
      draft: true,
      req,
    })
    if (dupes.totalDocs > 0) {
      throw new ValidationError({
        errors: [{ message: `Another item on this site already uses the URL "${slug}".`, path: 'slug' }],
      })
    }
    return slug
  }

export const slugField = (collection: CollectionSlug, from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Part of the web address. Lowercase letters, numbers and dashes. Use "home" for the front page.',
  },
  hooks: { beforeValidate: [uniquePerTenant(collection, from)] },
})
