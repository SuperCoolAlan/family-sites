import type { CollectionConfig } from 'payload'

import { anyone, loggedIn } from '../access'
import { deployAfterChange, deployAfterDelete } from '../hooks/deploy'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [deployAfterChange], afterDelete: [deployAfterDelete] },
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre', formatOptions: { format: 'webp' } },
      { name: 'card', width: 768, formatOptions: { format: 'webp' } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp' } },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the photo for people using screen readers, e.g. "New furnace installed in a basement".' },
    },
    { name: 'caption', type: 'text' },
  ],
}
