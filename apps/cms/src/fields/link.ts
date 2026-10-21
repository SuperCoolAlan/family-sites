import type { Field } from 'payload'

export const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true },
  {
    name: 'href',
    type: 'text',
    required: true,
    admin: { description: 'A page path like /contact (sites with several languages add the language prefix themselves), a phone link like tel:+19185550100, or a full https:// URL.' },
  },
]
