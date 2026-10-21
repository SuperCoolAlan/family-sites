import type { Block } from 'payload'

import { isAllowedBookingURL, BOOKING_HOSTS } from '../shared/booking'
import { linkFields } from '../fields/link'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'showLogo', type: 'checkbox', defaultValue: false },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'compact',
      options: [
        { label: 'Full screen', value: 'full' },
        { label: 'Compact banner', value: 'compact' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 2,
      fields: [
        ...linkFields,
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary'],
        },
      ],
    },
  ],
}

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'anchor', type: 'text', admin: { description: 'Optional id so links like /about#our-story jump here.' } },
  ],
}

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Our Services', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { description: 'Leave empty to show every published service.' },
    },
    { name: 'anchor', type: 'text' },
  ],
}

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'projects',
      options: [
        { label: 'Portfolio projects', value: 'projects' },
        { label: 'Hand-picked photos', value: 'images' },
      ],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        condition: (_, s) => s?.source === 'projects',
        description: 'Leave empty to show every published project.',
      },
    },
    {
      name: 'images',
      type: 'array',
      admin: { condition: (_, s) => s?.source === 'images' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
  ],
}

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'What Our Customers Say', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true, localized: true },
        { name: 'author', type: 'text', required: true },
        { name: 'location', type: 'text' },
      ],
    },
  ],
}

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'brand',
      options: [
        { label: 'Brand blue', value: 'brand' },
        { label: 'Urgent red', value: 'urgent' },
      ],
    },
    { name: 'buttons', type: 'array', maxRows: 2, fields: linkFields },
  ],
}

export const ContactForm: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Send Us a Message', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    {
      name: 'showContactInfo',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show phone, email and service area (from Site Settings) next to the form.' },
    },
  ],
}

export const BookingEmbed: Block = {
  slug: 'bookingEmbed',
  interfaceName: 'BookingEmbedBlock',
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Book Online', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'useSiteDefault',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Use the booking link from Site Settings.' },
    },
    {
      name: 'provider',
      type: 'select',
      defaultValue: 'iframe',
      options: [
        { label: 'Square / generic page (iframe)', value: 'iframe' },
        { label: 'Calendly inline widget', value: 'calendly' },
      ],
      admin: { condition: (_, s) => !s?.useSiteDefault },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, s) => !s?.useSiteDefault,
        description: `Allowed hosts: ${BOOKING_HOSTS.join(', ')}`,
      },
      validate: (v: string | null | undefined, { siblingData }: { siblingData: { useSiteDefault?: boolean } }) =>
        siblingData?.useSiteDefault || (v && isAllowedBookingURL(v)) || 'Use an https booking link from an allowed host.',
    },
    { name: 'height', type: 'number', defaultValue: 700, min: 300, max: 2000 },
  ],
}

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Frequently Asked Questions', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
}

export const FeatureList: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: { singular: 'Feature cards', plural: 'Feature cards' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const pageBlocks: Block[] = [
  Hero,
  RichText,
  ServicesGrid,
  FeatureList,
  Gallery,
  Testimonials,
  CTA,
  ContactForm,
  BookingEmbed,
  FAQ,
]
