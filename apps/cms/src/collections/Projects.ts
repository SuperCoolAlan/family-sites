import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'
import { deployAfterChange, deployAfterDelete } from '../hooks/deploy'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Portfolio' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'completedOn', '_status'], group: 'Content' },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: { afterChange: [deployAfterChange], afterDelete: [deployAfterDelete] },
  defaultSort: '-completedOn',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('projects'),
    { name: 'category', type: 'text', admin: { description: 'Short label on the card, e.g. "HVAC Installation".' } },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'location', type: 'text', admin: { position: 'sidebar' } },
    { name: 'completedOn', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'monthOnly' } } },
    { name: 'service', type: 'relationship', relationTo: 'services', admin: { position: 'sidebar' } },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Photos' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'description', type: 'richText' },
  ],
}
