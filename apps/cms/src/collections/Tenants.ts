import type { CollectionConfig } from 'payload'

import { superAdminField, superAdminOnly } from '../access'
import { localeOptions } from '../localization'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: { singular: 'Site', plural: 'Sites' },
  admin: { useAsTitle: 'name', group: 'Admin', defaultColumns: ['name', 'slug', 'domain'] },
  access: {
    // Static builds resolve their tenant by slug anonymously; the deploy hook field below stays hidden.
    read: () => true,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Matches TENANT_SLUG in the site build, e.g. fuel-mechanical.' },
    },
    { name: 'domain', type: 'text', admin: { description: 'Public hostname, e.g. fuelmechanical.asandov.com' } },
    {
      name: 'languages',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['es', 'en'],
      options: localeOptions,
      admin: { description: 'Languages this site is published in. Editors only see these in the language picker.' },
    },
    {
      name: 'pagesDeployHookUrl',
      label: 'Cloudflare Pages deploy hook URL',
      type: 'text',
      // The hook URL alone can trigger builds, so only super-admins may ever read it.
      access: { read: superAdminField, create: superAdminField, update: superAdminField },
      admin: { description: 'POSTed (debounced) when this site\'s content is published.' },
    },
  ],
}
