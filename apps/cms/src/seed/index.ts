import path from 'path'
import { fileURLToPath } from 'url'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import * as fuel from './fuel-mechanical'

const assets = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')
// Seeding must not fire Pages deploy hooks; run it, then publish one thing to trigger a build.
const context = { skipDeploy: true }

type Slugged = 'pages' | 'services' | 'projects'

const upsertBySlug = async (
  payload: Payload,
  collection: Slugged,
  tenant: number,
  data: Record<string, unknown> & { slug: string },
) => {
  const { docs } = await payload.find({
    collection,
    where: { and: [{ slug: { equals: data.slug } }, { tenant: { equals: tenant } }] },
    limit: 1,
    depth: 0,
    draft: true,
  })
  const body = { ...data, tenant, _status: 'published' as const }
  if (docs[0]) {
    return payload.update({ collection, id: docs[0].id, data: body as never, context })
  }
  return payload.create({ collection, data: body as never, context })
}

const seedAdmin = async (payload: Payload) => {
  const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password } = process.env
  const { totalDocs } = await payload.count({ collection: 'users' })
  if (totalDocs > 0 || !email || !password) return
  await payload.create({ collection: 'users', data: { email, password, name: 'Site admin', roles: ['super-admin'] } })
  payload.logger.info(`seed: created break-glass super-admin ${email}`)
}

const seedFuelMechanical = async (payload: Payload) => {
  const existing = await payload.find({ collection: 'tenants', where: { slug: { equals: fuel.tenant.slug } }, limit: 1 })
  const tenant = existing.docs[0]
    ? await payload.update({ collection: 'tenants', id: existing.docs[0].id, data: fuel.tenant, context })
    : await payload.create({ collection: 'tenants', data: fuel.tenant, context })
  const t = tenant.id

  const mediaIds: Record<string, number> = {}
  for (const m of fuel.media) {
    const found = await payload.find({
      collection: 'media',
      where: { and: [{ filename: { equals: m.file } }, { tenant: { equals: t } }] },
      limit: 1,
    })
    const doc =
      found.docs[0] ??
      (await payload.create({
        collection: 'media',
        data: { alt: m.alt, tenant: t },
        filePath: path.join(assets, m.file),
        context,
      }))
    mediaIds[m.key] = doc.id
  }

  const serviceIds: Record<string, number> = {}
  for (const s of fuel.services) {
    const doc = await upsertBySlug(payload, 'services', t, s)
    serviceIds[s.slug] = doc.id
  }

  for (const pr of fuel.projects) {
    await upsertBySlug(payload, 'projects', t, { ...pr, service: null })
  }

  const forms = await payload.find({
    collection: 'forms',
    where: { and: [{ title: { equals: fuel.contactForm.title } }, { tenant: { equals: t } }] },
    limit: 1,
  })
  const form = forms.docs[0]
    ? await payload.update({ collection: 'forms', id: forms.docs[0].id, data: { ...fuel.contactForm, tenant: t }, context })
    : await payload.create({ collection: 'forms', data: { ...fuel.contactForm, tenant: t }, context })

  const settingsData = {
    ...fuel.settings,
    tenant: t,
    logo: mediaIds.logo,
    logoOnDark: mediaIds.logoOnDark,
    footerServices: fuel.footerServiceSlugs.map((s) => serviceIds[s]),
  }
  const settings = await payload.find({ collection: 'site-settings', where: { tenant: { equals: t } }, limit: 1 })
  if (settings.docs[0]) {
    await payload.update({ collection: 'site-settings', id: settings.docs[0].id, data: settingsData, context })
  } else {
    await payload.create({ collection: 'site-settings', data: settingsData, context })
  }

  for (const pg of fuel.pages(form.id)) {
    await upsertBySlug(payload, 'pages', t, pg)
  }
  payload.logger.info(`seed: ${fuel.tenant.slug} ready (tenant id ${t})`)
}

const payload = await getPayload({ config })
await seedAdmin(payload)
await seedFuelMechanical(payload)
process.exit(0)
