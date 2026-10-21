import type { CollectionConfig } from 'payload'

import { anyone, loggedIn } from '../access'
import { isAllowedBookingURL, BOOKING_HOSTS } from '../shared/booking'
import { deployAfterChange, deployAfterDelete } from '../hooks/deploy'

// One document per tenant: the multi-tenant plugin's isGlobal turns this into a per-site global.
export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  labels: { singular: 'Site Settings', plural: 'Site Settings' },
  admin: { useAsTitle: 'businessName', group: 'Content' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [deployAfterChange], afterDelete: [deployAfterDelete] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Business',
          fields: [
            { name: 'businessName', type: 'text', required: true },
            { name: 'shortName', type: 'text', admin: { description: 'Shown next to the logo in the menu.' } },
            { name: 'tagline', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true, admin: { description: 'Default search-engine description.' } },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'logoOnDark', type: 'upload', relationTo: 'media', admin: { description: 'Optional white logo for dark backgrounds.' } },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text' },
            { name: 'email', type: 'email' },
            {
              name: 'whatsapp',
              label: 'WhatsApp number',
              type: 'text',
              admin: { description: 'With country code, e.g. +1 918 555 0100. Sites show a WhatsApp chat button.' },
              validate: (v: string | null | undefined) =>
                !v || /^\+?[\d\s().-]{7,20}$/.test(v) || 'Use digits with the country code, e.g. +1 918 555 0100.',
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'street', type: 'text' },
                { name: 'city', type: 'text' },
                { name: 'state', type: 'text' },
                { name: 'zip', type: 'text' },
                { name: 'showOnSite', type: 'checkbox', defaultValue: false },
              ],
            },
            { name: 'serviceArea', type: 'text', localized: true },
            {
              name: 'hours',
              type: 'array',
              fields: [
                { name: 'days', type: 'text', required: true, localized: true, admin: { description: 'e.g. Mon - Fri' } },
                { name: 'hours', type: 'text', required: true, localized: true, admin: { description: 'e.g. 8am - 5pm, or Closed' } },
              ],
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: ['facebook', 'instagram', 'google', 'yelp', 'nextdoor', 'linkedin', 'youtube', 'tiktok', 'x'],
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Booking',
          fields: [
            {
              name: 'booking',
              type: 'group',
              fields: [
                {
                  name: 'provider',
                  type: 'select',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Square / generic page (iframe)', value: 'iframe' },
                    { label: 'Calendly inline widget', value: 'calendly' },
                  ],
                  defaultValue: 'none',
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, s) => s?.provider && s.provider !== 'none',
                    description: `Allowed hosts: ${BOOKING_HOSTS.join(', ')}`,
                  },
                  validate: (v: string | null | undefined, { siblingData }: { siblingData: { provider?: string } }) =>
                    !siblingData?.provider ||
                    siblingData.provider === 'none' ||
                    (v && isAllowedBookingURL(v)) ||
                    'Use an https booking link from an allowed host.',
                },
                { name: 'buttonLabel', type: 'text', defaultValue: 'Book Online', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerBlurb', type: 'text', localized: true },
            { name: 'footerServices', type: 'relationship', relationTo: 'services', hasMany: true, maxRows: 6 },
          ],
        },
      ],
    },
  ],
}
