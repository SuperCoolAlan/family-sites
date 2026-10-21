// Uploads a folder of photos as one tenant's Media, with TODO alt text, and optionally queues them in a page's gallery as a draft.
// Usage: pnpm --filter cms import-media <tenant-slug> <folder> [gallery-page-slug]
import fs from 'fs'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { context, type ByLocale, type Locale } from '../seed/lib'

const IMAGE = /\.(jpe?g|png|webp|avif|gif|tiff?)$/i

const [tenantSlug, folderArg, gallerySlug] = process.argv.slice(2)
if (!tenantSlug || !folderArg) {
  console.error('usage: pnpm --filter cms import-media <tenant-slug> <folder> [gallery-page-slug]')
  process.exit(2)
}
const folder = path.resolve(process.env.INIT_CWD ?? process.cwd(), folderArg)
if (!fs.existsSync(folder)) {
  console.error(`import-media: no such folder ${folder}`)
  process.exit(2)
}

// Optional <folder>/alt.json: { "photo.jpg": { "es": "...", "en": "..." } } replaces the TODO placeholders.
const altFile = path.join(folder, 'alt.json')
const altText: Record<string, ByLocale<string>> = fs.existsSync(altFile) ? JSON.parse(fs.readFileSync(altFile, 'utf8')) : {}
const placeholder: Record<Locale, (f: string) => string> = {
  es: (f) => `TODO: describir la foto (${f})`,
  en: (f) => `TODO: describe the photo (${f})`,
}

const payload = await getPayload({ config })
const { docs: tenants } = await payload.find({ collection: 'tenants', where: { slug: { equals: tenantSlug } }, limit: 1, depth: 0 })
const tenant = tenants[0]
if (!tenant) {
  console.error(`import-media: tenant "${tenantSlug}" not found`)
  process.exit(1)
}
const locales = (tenant.languages?.length ? tenant.languages : ['es', 'en']) as Locale[]

const files = fs.readdirSync(folder).filter((f) => IMAGE.test(f)).sort()
const imported: number[] = []
let skipped = 0
for (const file of files) {
  const existing = await payload.find({
    collection: 'media',
    where: { and: [{ filename: { equals: file } }, { tenant: { equals: tenant.id } }] },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) {
    skipped++
    continue
  }
  let id: number | undefined
  for (const locale of locales) {
    const alt = altText[file]?.[locale] || placeholder[locale](file)
    if (id) {
      await payload.update({ collection: 'media', id, data: { alt }, locale, depth: 0, context })
    } else {
      const doc = await payload.create({
        collection: 'media',
        data: { alt, tenant: tenant.id },
        filePath: path.join(folder, file),
        locale,
        depth: 0,
        context,
      })
      id = doc.id
    }
  }
  imported.push(id!)
  payload.logger.info(`import-media: ${file} -> media ${id}`)
}

if (gallerySlug && imported.length) {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { and: [{ slug: { equals: gallerySlug } }, { tenant: { equals: tenant.id } }] },
    limit: 1,
    depth: 0,
    draft: true,
    locale: locales[0],
  })
  const page = docs[0]
  const layout = (page?.layout ?? []) as { blockType: string; source?: string; images?: { image: number }[] }[]
  const target = layout.find((b) => b.blockType === 'gallery' && b.source === 'images')
  if (!page || !target) {
    payload.logger.warn(`import-media: page "${gallerySlug}" has no hand-picked photo gallery; add the photos in the admin`)
  } else {
    target.images = [...(target.images ?? []), ...imported.map((image) => ({ image }))]
    // Saved as a draft so TODO alt text never goes live until an editor reviews and publishes.
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { layout } as never,
      draft: true,
      locale: locales[0],
      depth: 0,
      context,
    })
    payload.logger.info(`import-media: added ${imported.length} photos to a draft of /${gallerySlug}; review alt text, then Publish`)
  }
}

payload.logger.info(`import-media: ${imported.length} uploaded, ${skipped} already there, tenant ${tenantSlug}`)
process.exit(0)
