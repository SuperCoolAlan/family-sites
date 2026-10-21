import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { isSuperAdmin, loggedIn, superAdminOnly } from './access'
import { oidcPlugin } from './auth/oidc'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { SiteSettings } from './collections/SiteSettings'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { env } from './env'
import { localization } from './localization'
import { protectSubmission, submissionTenantFromForm } from './forms/protect'
import { deployAfterChange, deployAfterDelete } from './hooks/deploy'
import { migrations } from './migrations'
import type { Config } from './payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const origins = [env.serverURL, ...env.corsOrigins]

export default buildConfig({
  serverURL: env.serverURL,
  secret: env.payloadSecret,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' - Family Sites' },
    components: { afterLogin: ['@/components/SSOLoginButton#SSOLoginButton'] },
  },
  collections: [Pages, Services, Projects, Media, SiteSettings, Tenants, Users],
  editor: lexicalEditor(),
  localization,
  cors: origins,
  csrf: origins,
  db: postgresAdapter({
    pool: { connectionString: env.databaseURI },
    // Dev uses the same committed migrations as prod, so schema drift shows up locally first.
    push: false,
    // Applied on boot when NODE_ENV=production; no cross-pod lock, so run a single replica.
    prodMigrations: migrations,
  }),
  email: env.smtp.host
    ? nodemailerAdapter({
        defaultFromAddress: env.smtp.from.address,
        defaultFromName: env.smtp.from.name,
        transportOptions: {
          host: env.smtp.host,
          port: env.smtp.port,
          secure: env.smtp.port === 465,
          auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
        },
      })
    : undefined,
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [
    formBuilderPlugin({
      fields: { payment: false, upload: false, country: false, state: true, date: true },
      formOverrides: {
        admin: { group: 'Forms' },
        access: { read: () => true, create: loggedIn, update: loggedIn, delete: loggedIn },
        hooks: { afterChange: [deployAfterChange], afterDelete: [deployAfterDelete] },
      },
      formSubmissionOverrides: {
        admin: { group: 'Forms' },
        access: { create: () => true, read: loggedIn, update: superAdminOnly, delete: loggedIn },
        hooks: { beforeOperation: [protectSubmission], beforeChange: [submissionTenantFromForm] },
        // Own tenant field: the plugin's one rejects anonymous writes, but public visitors submit these.
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: 'tenant', type: 'relationship', relationTo: 'tenants', index: true, admin: { readOnly: true, position: 'sidebar' } },
        ],
      },
    }),
    oidcPlugin(),
    s3Storage({
      // Gated so the admin still boots before the R2 secret exists; uploads fail until it does.
      enabled: Boolean(env.s3.endpoint && env.s3.bucket),
      // Keeps the schema (and therefore migrations) identical whether or not R2 is configured.
      alwaysInsertFields: true,
      bucket: env.s3.bucket,
      collections: {
        media: {
          // Static sites link straight to the R2 public domain, never back to the homelab.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            [env.mediaPublicURL, prefix, encodeURIComponent(filename)].filter(Boolean).join('/'),
        },
      },
      config: {
        endpoint: env.s3.endpoint,
        region: env.s3.region,
        forcePathStyle: env.s3.forcePathStyle,
        credentials: { accessKeyId: env.s3.accessKeyId, secretAccessKey: env.s3.secretAccessKey },
      },
    }),
    multiTenantPlugin<Config>({
      tenantsSlug: 'tenants',
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
      tenantsArrayField: {
        includeDefaultField: true,
        arrayFieldAccess: { create: ({ req }) => isSuperAdmin(req.user), update: ({ req }) => isSuperAdmin(req.user) },
        tenantFieldAccess: { create: ({ req }) => isSuperAdmin(req.user), update: ({ req }) => isSuperAdmin(req.user) },
      },
      collections: {
        pages: {},
        services: {},
        projects: {},
        media: {},
        forms: {},
        'form-submissions': { customTenantField: true },
        'site-settings': { isGlobal: true },
      },
    }),
  ],
})
