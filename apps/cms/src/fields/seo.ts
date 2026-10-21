import type { Field } from 'payload'

export const seoField: Field = {
  name: 'meta',
  label: 'SEO',
  type: 'group',
  admin: { description: 'How this page appears in Google and when shared. Leave blank to use the page title.' },
  fields: [
    { name: 'title', type: 'text', maxLength: 70, localized: true },
    { name: 'description', type: 'textarea', maxLength: 170, localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
