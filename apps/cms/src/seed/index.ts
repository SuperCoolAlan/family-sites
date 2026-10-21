import path from 'path'
import { fileURLToPath } from 'url'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { fuelMechanical } from './fuel-mechanical'
import { seedTenant } from './lib'
import { shPoniesDesserts } from './sh-ponies-desserts'

const assets = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')

const seedAdmin = async (payload: Payload) => {
  const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password } = process.env
  const { totalDocs } = await payload.count({ collection: 'users' })
  if (totalDocs > 0 || !email || !password) return
  await payload.create({ collection: 'users', data: { email, password, name: 'Site admin', roles: ['super-admin'] } })
  payload.logger.info(`seed: created break-glass super-admin ${email}`)
}

const payload = await getPayload({ config })
await seedAdmin(payload)
for (const seed of [fuelMechanical, shPoniesDesserts]) await seedTenant(payload, seed, assets)
process.exit(0)
