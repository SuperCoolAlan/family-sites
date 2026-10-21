import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '../access'
import { pageBlocks } from '../blocks'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { deployAfterChange, deployAfterDelete } from '../hooks/deploy'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', '_status', 'updatedAt'], group: 'Content' },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: { afterChange: [deployAfterChange], afterDelete: [deployAfterDelete] },
  defaultSort: 'navOrder',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('pages'),
    {
      name: 'navOrder',
      type: 'number',
      admin: { position: 'sidebar', description: 'Position in the top menu (lowest first). Leave empty to hide from the menu.' },
    },
    {
      type: 'tabs',
      tabs: [
        { label: 'Content', fields: [{ name: 'layout', type: 'blocks', blocks: pageBlocks }] },
        { label: 'SEO', fields: [seoField] },
      ],
    },
  ],
}
