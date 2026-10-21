// The first locale is the default (served at / via a redirect). Adding one needs its strings below and in scripts/snapshot.mjs.
export const LOCALES = ['es', 'en'] as const
export type Lang = (typeof LOCALES)[number]
export const DEFAULT_LANG: Lang = LOCALES[0]

export const isLang = (v: unknown): v is Lang => LOCALES.includes(v as Lang)

const strings = {
  es: {
    name: 'Español',
    ogLocale: 'es_US',
    skip: 'Saltar al contenido',
    mainNav: 'Menú principal',
    langNav: 'Idioma',
    switchTo: 'Ver en español',
    pages: 'Páginas',
    contact: 'Contacto',
    hours: 'Horario',
    area: 'Zona',
    follow: 'Sígueme',
    whatsapp: 'Escríbeme por WhatsApp',
    whatsappText: '¡Hola! Me interesa hacer un pedido.',
    call: 'Llamar',
    email: 'Correo',
    rights: 'Todos los derechos reservados.',
    otherWays: 'Otras formas de contactarme',
    choose: 'Elige una opción',
    sending: 'Enviando…',
    needCheck: 'Completa la verificación de seguridad de arriba.',
    failed: 'No se pudo enviar',
    failedHelp: 'Inténtalo de nuevo o escríbeme por Facebook.',
    formOff: 'El formulario no está disponible en este momento. Escríbeme por Facebook y con gusto te atiendo.',
    photosSoon: 'Muy pronto habrá fotos aquí. Mientras tanto, mira mis pedidos en Facebook.',
    required: 'obligatorio',
    notFoundTitle: 'Página no encontrada',
    notFoundText: 'Esa página no existe o cambió de lugar.',
    goHome: 'Ir al inicio',
  },
  en: {
    name: 'English',
    ogLocale: 'en_US',
    skip: 'Skip to content',
    mainNav: 'Main menu',
    langNav: 'Language',
    switchTo: 'View in English',
    pages: 'Pages',
    contact: 'Contact',
    hours: 'Hours',
    area: 'Area',
    follow: 'Follow me',
    whatsapp: 'Message me on WhatsApp',
    whatsappText: "Hi! I'd like to place an order.",
    call: 'Call',
    email: 'Email',
    rights: 'All rights reserved.',
    otherWays: 'Other ways to reach me',
    choose: 'Choose one',
    sending: 'Sending…',
    needCheck: 'Please complete the security check above.',
    failed: "That didn't go through",
    failedHelp: 'Please try again or message me on Facebook.',
    formOff: "The form isn't available right now. Please message me on Facebook and I'll be happy to help.",
    photosSoon: 'Photos are coming soon. In the meantime, see my latest orders on Facebook.',
    required: 'required',
    notFoundTitle: 'Page not found',
    notFoundText: "That page doesn't exist or has moved.",
    goHome: 'Go to the home page',
  },
} satisfies Record<Lang, Record<string, string>>

export const t = (lang: Lang) => strings[lang]

/** Path of a CMS page in a language: home is /es/, others /es/<slug>. */
export const pagePath = (lang: Lang, slug: string) => (slug === 'home' ? `/${lang}/` : `/${lang}/${slug}`)

/** Editors write site paths like /order; they get the current language prefix. Anchors and full URLs pass through. */
export const localHref = (href: string, lang: Lang) => {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (LOCALES.some((l) => href === `/${l}` || href.startsWith(`/${l}/`))) return href
  return href === '/' ? `/${lang}/` : `/${lang}${href}`
}
