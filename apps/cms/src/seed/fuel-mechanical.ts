// Public business info only (from the published draft site); this repo is public.
import type { TenantSeed } from './lib'
import { doc, p } from './richtext'

// English-only: everything is saved in the `en` locale and the site requests ?locale=en.
const tenant = {
  name: 'Fuel Mechanical LLC',
  slug: 'fuel-mechanical',
  domain: 'fuelmechanical.asandov.com',
  languages: ['en' as const],
}

const en = <T>(data: T) => ({ en: data })

const PHONE = '(918) 991-2324'
const TEL = 'tel:+19189912324'
const FACEBOOK = 'https://www.facebook.com/fuelmechanical'

const media = [
  { key: 'logo', file: 'fuel-mechanical-logo.png', alt: en('Fuel Mechanical LLC logo') },
  { key: 'logoOnDark', file: 'fuel-mechanical-logo-white.png', alt: en('Fuel Mechanical LLC logo (white)') },
]

const services = [
  {
    slug: 'hvac-installation-repair',
    title: 'HVAC Installation & Repair',
    icon: 'wrench',
    summary: 'Complete heating and cooling system installs and repairs, sized and set up for efficient, reliable comfort.',
  },
  {
    slug: 'heating-maintenance',
    title: 'Heating System Maintenance',
    icon: 'heating',
    summary: 'Seasonal furnace and heat pump tune-ups that catch problems early and keep your system running safely.',
  },
  {
    slug: 'air-conditioning',
    title: 'Air Conditioning Services',
    icon: 'cooling',
    summary: 'AC repair, replacement and tune-ups to keep you cool through an Oklahoma summer.',
  },
  {
    slug: 'air-quality',
    title: 'Air Quality',
    icon: 'air',
    summary: 'Filtration, ventilation and humidity solutions for cleaner, healthier indoor air.',
  },
  {
    slug: 'water-heaters',
    title: 'Water Heater Installation',
    icon: 'water',
    summary: 'Tank and tankless water heater installation and replacement.',
  },
  {
    slug: 'ductwork',
    title: 'Ductwork Installation',
    icon: 'hvac',
    summary: 'Precision ductwork design and installation for even airflow in every room.',
  },
  {
    slug: 'commercial-hvac',
    title: 'Commercial HVAC',
    icon: 'commercial',
    summary: 'Installation and service for rooftop units and commercial heating and cooling systems.',
  },
  {
    slug: 'industrial-air-handlers',
    title: 'Industrial Air Handlers',
    icon: 'industrial',
    summary: 'Installation and maintenance of air handling units for industrial and large commercial spaces.',
  },
  {
    slug: 'emergency-repairs',
    title: 'Emergency Repairs',
    icon: 'emergency',
    summary: 'When your heat or AC quits, call us and we will work to restore your comfort fast.',
  },
  {
    slug: 'system-inspections',
    title: 'System Inspections',
    icon: 'wrench',
    summary: 'Thorough inspections for home purchases, insurance, or peace of mind.',
  },
].map((s, i) => ({ ...s, order: (i + 1) * 10 }))

const footerServiceSlugs = [
  'hvac-installation-repair',
  'heating-maintenance',
  'air-conditioning',
  'water-heaters',
]

const projects = [
  {
    slug: 'residential-hvac-system',
    title: 'Residential HVAC System',
    category: 'HVAC Installation',
    summary: 'Complete system installation with precision ductwork and energy-efficient components.',
  },
  {
    slug: 'commercial-heating-service',
    title: 'Commercial Heating Service',
    category: 'Heating Repair',
    summary: 'Emergency repair and maintenance on commercial heating system, restoring optimal performance.',
  },
  {
    slug: 'air-conditioning-tune-up',
    title: 'Air Conditioning Tune-Up',
    category: 'AC Maintenance',
    summary: 'Comprehensive maintenance service ensuring peak efficiency and extending system lifespan.',
  },
]

const contactForm = {
  title: 'Contact - Fuel Mechanical',
  submitButtonLabel: 'Send Message',
  confirmationType: 'message' as const,
  confirmationMessage: doc(p("Thanks for reaching out! We'll respond within 24 hours.")),
  fields: [
    { blockType: 'text' as const, name: 'name', label: 'Full Name', required: true, width: 100 },
    { blockType: 'email' as const, name: 'email', label: 'Email Address', required: true, width: 50 },
    { blockType: 'text' as const, name: 'phone', label: 'Phone Number', required: false, width: 50 },
    {
      blockType: 'select' as const,
      name: 'service',
      label: 'Service Needed',
      placeholder: 'Select a service',
      required: false,
      width: 100,
      options: [
        { label: 'HVAC Installation', value: 'installation' },
        { label: 'Repair Service', value: 'repair' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Emergency Service', value: 'emergency' },
        { label: 'Other', value: 'other' },
      ],
    },
    { blockType: 'textarea' as const, name: 'message', label: 'Message', required: true, width: 100 },
  ],
  emails: [
    {
      emailTo: 'info@fuelmechanical.com',
      replyTo: '{{email}}',
      subject: 'New website message from {{name}}',
      message: doc(p('A new message came in through the website contact form:'), p('{{*:table}}')),
    },
  ],
}

const settings = {
  businessName: 'Fuel Mechanical LLC',
  shortName: 'Fuel Mechanical',
  tagline: 'Heating & Cooling',
  description: 'Professional heating and cooling services by Fuel Mechanical LLC. Expert HVAC installation, repair, and maintenance.',
  phone: PHONE,
  email: 'info@fuelmechanical.com',
  serviceArea: 'Tulsa Metro Area',
  address: { showOnSite: false },
  hours: [],
  socialLinks: [{ platform: 'facebook' as const, url: FACEBOOK }],
  booking: { provider: 'none' as const, buttonLabel: 'Book Online' },
  footerBlurb: 'Professional heating and cooling services',
}

const hero = (heading: string, subheading: string) => ({ blockType: 'hero' as const, heading, subheading, size: 'compact' as const })

const whyChooseUs = {
  blockType: 'features' as const,
  heading: 'Why Choose Us',
  items: [
    { title: 'Experienced Team', text: 'Certified technicians with years of industry experience' },
    { title: 'Quality Work', text: 'We stand behind our work with comprehensive warranties' },
    { title: 'Fair Pricing', text: 'Transparent pricing with no hidden fees or surprises' },
    { title: 'Licensed & Insured', text: 'Fully licensed and insured for your peace of mind and protection' },
  ],
}

const callCTA = {
  blockType: 'cta' as const,
  tone: 'urgent' as const,
  heading: 'Need Service?',
  text: `For heating and cooling service, call us at ${PHONE}. We provide reliable solutions to restore your comfort.`,
  buttons: [{ label: `Call ${PHONE}`, href: TEL }],
}

// `form` is filled in by the seed runner once the form exists.
const pages = (formId: number | string) => [
  {
    slug: 'home',
    title: 'Home',
    navOrder: 10,
    meta: {
      title: 'Fuel Mechanical LLC - Heating & Cooling Services',
      description: settings.description,
    },
    layout: [
      {
        blockType: 'hero' as const,
        size: 'full' as const,
        showLogo: true,
        heading: 'Fuel Mechanical LLC',
        tagline: 'Heating & Cooling',
        subheading: 'Professional HVAC services you can trust',
        buttons: [
          { label: 'Get A Quote', href: '/contact', style: 'primary' as const },
          { label: 'Our Services', href: '/services', style: 'secondary' as const },
        ],
      },
      { blockType: 'servicesGrid' as const, heading: 'What We Do', intro: 'Heating, cooling and air quality for homes and businesses across the Tulsa metro.' },
      whyChooseUs,
      {
        blockType: 'cta' as const,
        tone: 'brand' as const,
        heading: 'Ready when you need us',
        text: 'Tell us about your heating or cooling project and we will get back to you with a quote.',
        buttons: [
          { label: 'Get A Quote', href: '/contact' },
          { label: `Call ${PHONE}`, href: TEL },
        ],
      },
    ],
  },
  {
    slug: 'about',
    title: 'About',
    navOrder: 20,
    meta: {
      title: 'About Us - Fuel Mechanical LLC',
      description:
        'Learn about Fuel Mechanical LLC, your trusted heating and cooling professionals with years of experience serving the community.',
    },
    layout: [
      hero('About Fuel Mechanical', 'Your trusted heating and cooling professionals'),
      {
        blockType: 'richText' as const,
        anchor: 'our-story',
        heading: 'Our Story',
        content: doc(
          p(
            'Fuel Mechanical LLC has been serving the community with reliable heating and cooling solutions. We pride ourselves on delivering precision workmanship and exceptional quality in every project for both residential and commercial clients.',
          ),
          p(
            'Our team of certified technicians brings years of experience and meticulous attention to detail to every installation, ensuring your comfort systems operate with optimal efficiency and reliability.',
          ),
        ),
      },
      { blockType: 'servicesGrid' as const, heading: 'Our Services', anchor: 'our-services' },
      whyChooseUs,
    ],
  },
  {
    slug: 'services',
    title: 'Services',
    navOrder: 30,
    meta: {
      title: 'Services - Fuel Mechanical LLC',
      description: 'HVAC installation and repair, heating and air conditioning service, air quality, water heaters, ductwork and commercial HVAC in the Tulsa metro.',
    },
    layout: [
      hero('Our Services', 'Heating, cooling and air quality for homes and businesses'),
      { blockType: 'servicesGrid' as const, heading: 'How We Can Help' },
      {
        blockType: 'faq' as const,
        heading: 'Frequently Asked Questions',
        items: [
          { question: 'What areas do you serve?', answer: 'We serve residential and commercial clients throughout the Tulsa Metro Area.' },
          { question: 'Do you work on commercial systems?', answer: 'Yes. Along with homes, we install and service commercial HVAC systems and industrial air handlers.' },
          { question: 'Are you licensed and insured?', answer: 'Yes, Fuel Mechanical is fully licensed and insured for your peace of mind and protection.' },
        ],
      },
      callCTA,
    ],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    navOrder: 40,
    meta: {
      title: 'Portfolio - Fuel Mechanical LLC',
      description:
        'View our portfolio of heating and cooling projects. See the quality workmanship and precision engineering that Fuel Mechanical LLC delivers.',
    },
    layout: [
      hero('Our Portfolio', 'Quality workmanship and precision'),
      {
        blockType: 'gallery' as const,
        source: 'projects' as const,
        heading: 'See Our Work in Action',
        intro:
          'Take a look at some of our recent HVAC installations, repairs, and maintenance projects. Each project showcases our commitment to precision and quality craftsmanship.',
      },
      {
        blockType: 'cta' as const,
        tone: 'brand' as const,
        heading: 'More projects on Facebook',
        text: 'Follow us on Facebook to see our latest projects and updates.',
        buttons: [{ label: 'Visit Our Facebook Page', href: FACEBOOK }],
      },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact',
    navOrder: 50,
    meta: {
      title: 'Contact Us - Fuel Mechanical LLC',
      description:
        'Get in touch with Fuel Mechanical LLC for all your heating and cooling needs. Call us today or fill out our contact form.',
    },
    layout: [
      hero('Contact Us', 'Ready to help with all your heating and cooling needs'),
      {
        blockType: 'contactForm' as const,
        heading: 'Send Us a Message',
        intro: "Have a question or need service? We're here to help. Contact us today for fast, reliable heating and cooling solutions.",
        form: formId,
        showContactInfo: true,
      },
      callCTA,
    ],
  },
]


export const fuelMechanical: TenantSeed = {
  tenant,
  media,
  services: services.map(en),
  projects: projects.map((pr) => en({ ...pr, service: null })),
  forms: { contact: en(contactForm) },
  settings: (refs) =>
    en({
      ...settings,
      logo: refs.media.logo,
      logoOnDark: refs.media.logoOnDark,
      footerServices: footerServiceSlugs.map((s) => refs.services[s]),
    }),
  pages: (refs) => pages(refs.forms.contact).map(en),
}
