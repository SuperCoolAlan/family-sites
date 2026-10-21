import type { CollectionConfig } from 'payload'

import { isSuperAdmin, superAdminField, superAdminOnly } from '../access'
import { oidcStartEndpoint } from '../auth/oidc'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'username', 'roles', 'tenants'],
    group: 'Admin',
  },
  auth: true,
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: superAdminOnly,
    delete: superAdminOnly,
    read: ({ req }) => (isSuperAdmin(req.user) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (isSuperAdmin(req.user) ? true : req.user ? { id: { equals: req.user.id } } : false),
  },
  endpoints: [oidcStartEndpoint],
  hooks: {
    // Collection beforeValidate runs after Payload has captured the password, so stripping must happen here.
    beforeOperation: [
      ({ args, operation, req }) => {
        const u = req.user as { sub?: string | null } | null
        if (operation === 'update' && u?.sub && !isSuperAdmin(req.user) && args.data) {
          delete args.data.password
          delete args.data.email
        }
        return args
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        // The very first local account (Payload's create-first-user screen) is the break-glass super-admin.
        if (operation === 'create' && !data.sub) {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
          if (totalDocs === 0) data.roles = ['super-admin']
        }
        if (!data.name && data.email) data.name = data.email
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Super admin', value: 'super-admin' },
        { label: 'Site editor', value: 'editor' },
      ],
      access: { create: superAdminField, update: superAdminField },
      admin: { position: 'sidebar' },
    },
    {
      // Declared here (not left to payload-oauth2) so the schema and migrations don't depend on OIDC being enabled.
      name: 'sub',
      label: 'Authentik subject',
      type: 'text',
      unique: true,
      index: true,
      access: { update: () => false },
      admin: { readOnly: true, description: 'Stable Authentik user id; SSO logins match on this, never on email.' },
    },
    {
      name: 'username',
      type: 'text',
      index: true,
      admin: { readOnly: true, description: 'Authentik username (synced on each SSO login).' },
    },
    {
      name: 'contactEmail',
      type: 'text',
      admin: { readOnly: true, description: 'Email from Authentik, for reference only. Not used to sign in.' },
    },
  ],
}
