import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'
import { deployAfterChange, deployAfterDelete } from '../hooks/deploy'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order', '_status'], group: 'Content' },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: { afterChange: [deployAfterChange], afterDelete: [deployAfterDelete] },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('services'),
    { name: 'order', type: 'number', admin: { position: 'sidebar', description: 'Lowest shows first.' } },
    { name: 'summary', type: 'textarea', required: true, localized: true, admin: { description: 'One or two sentences shown on service cards.' } },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'hvac',
      options: [
        { label: 'Snowflake (cooling)', value: 'cooling' },
        { label: 'Flame (heating)', value: 'heating' },
        { label: 'Wind (air quality)', value: 'air' },
        { label: 'Wrench (install & repair)', value: 'wrench' },
        { label: 'Factory (industrial)', value: 'industrial' },
        { label: 'Building (commercial)', value: 'commercial' },
        { label: 'Droplet (water heaters)', value: 'water' },
        { label: 'Alert (emergency)', value: 'emergency' },
        { label: 'Fan (HVAC)', value: 'hvac' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'richText', localized: true },
  ],
}
