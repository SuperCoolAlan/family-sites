// Public info only (the Facebook page's intro and post captions); this repo is public, so no phone/email until the family provides them.
// Every "TODO" string below shows on the site until the family sends the real details.
import { bilingual, tr, type TenantSeed } from './lib'
import { doc, p, ul } from './richtext'

const NAME = 'S&H Ponie’s Desserts'
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61588069222223'

const tenant = {
  name: NAME,
  slug: 'sh-ponies-desserts',
  domain: 'poniesdesserts.asandov.com',
  languages: ['es' as const, 'en' as const],
}

const media = [
  {
    key: 'logo',
    // Placeholder monogram; drop her Facebook avatar into seed/assets/local/ to use it instead (never commit it).
    file: 'sh-ponies-desserts-logo.png',
    localFile: 'sh-ponies-desserts-avatar.jpg',
    alt: { es: `Logotipo de ${NAME}`, en: `${NAME} logo` },
  },
]

const hero = (heading: string, subheading: string) => ({ blockType: 'hero', size: 'compact', heading, subheading })

const orderCTA = {
  blockType: 'cta',
  tone: 'brand',
  heading: tr('¿Tienes un evento en puerta?', 'Planning an event?'),
  text: tr(
    'Cuéntame la fecha, cuántos invitados esperas y qué postres se te antojan.',
    'Tell me the date, how many guests you expect and which desserts you have in mind.',
  ),
  buttons: [{ label: tr('Haz tu pedido', 'Request an order'), href: '/order' }],
}

const orderForm = bilingual({
  title: `Pedido - ${NAME}`,
  submitButtonLabel: tr('Enviar pedido', 'Send request'),
  confirmationType: 'message',
  confirmationMessage: tr(
    doc(p('¡Gracias! Recibí tu pedido y te contactaré pronto para confirmar los detalles.')),
    doc(p('Thank you! I received your request and will contact you soon to confirm the details.')),
  ),
  fields: [
    { blockType: 'text', name: 'name', label: tr('Nombre', 'Name'), required: true, width: 50 },
    { blockType: 'text', name: 'phone', label: tr('Teléfono o WhatsApp', 'Phone or WhatsApp'), required: true, width: 50 },
    { blockType: 'email', name: 'email', label: tr('Correo electrónico (opcional)', 'Email (optional)'), required: false, width: 50 },
    { blockType: 'date', name: 'eventDate', label: tr('Fecha del evento', 'Event date'), required: true, width: 50 },
    {
      blockType: 'select',
      name: 'eventType',
      label: tr('Tipo de evento', 'Type of event'),
      placeholder: tr('Elige una opción', 'Choose one'),
      required: false,
      width: 50,
      options: [
        { value: 'birthday', label: tr('Cumpleaños', 'Birthday') },
        { value: 'wedding', label: tr('Boda', 'Wedding') },
        { value: 'quinceanera', label: tr('XV años', 'Quinceañera') },
        { value: 'baby-shower', label: tr('Baby shower', 'Baby shower') },
        { value: 'religious', label: tr('Bautizo o primera comunión', 'Baptism or first communion') },
        { value: 'graduation', label: tr('Graduación', 'Graduation') },
        { value: 'business', label: tr('Evento de empresa', 'Business event') },
        { value: 'other', label: tr('Otro', 'Other') },
      ],
    },
    { blockType: 'number', name: 'guests', label: tr('Número de invitados', 'Number of guests'), required: false, width: 50 },
    {
      blockType: 'textarea',
      name: 'desserts',
      label: tr('¿Qué postres te gustaría?', 'Which desserts would you like?'),
      required: true,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'notes',
      label: tr('Notas: sabores, alergias, entrega, presupuesto', 'Notes: flavors, allergies, delivery, budget'),
      required: false,
      width: 100,
    },
  ],
  // TODO(family): add the address that should get an email for each new order; until then they show under Forms in the admin.
  emails: [],
})

const menuSections = [
  {
    title: tr('Mini cheesecakes', 'Mini cheesecakes'),
    description: tr('Cheesecakes individuales, como los de blackberry (zarzamora).', 'Individual cheesecakes, like the blackberry ones.'),
    items: [{ name: tr('Mini cheesecake de blackberry', 'Blackberry mini cheesecake') }],
  },
  {
    title: tr('Pastelitos de hojaldre con fruta', 'Fruit puff pastries'),
    description: tr(
      'Hojaldre con fresas y moras azules, espolvoreado con azúcar glas.',
      'Puff pastry with strawberries and blueberries, dusted with powdered sugar.',
    ),
  },
  {
    title: tr('Tartaletas de fruta', 'Fruit tartlets'),
    description: tr('Tartaletas con crema pastelera y fruta fresca.', 'Tartlets with pastry cream and fresh fruit.'),
  },
  {
    title: tr('Gelatinas', 'Gelatin cups'),
    description: tr('Vasitos de gelatina, perfectos para una mesa de postres.', 'Gelatin cups, perfect for a dessert table.'),
  },
  {
    title: tr('Galletas rellenas de mermelada', 'Jam-filled cookies'),
    description: tr('Galletas de mantequilla en forma de flor con mermelada.', 'Flower-shaped butter cookies with jam.'),
  },
  {
    title: tr('Mesas de postres para eventos', 'Event dessert tables'),
    description: tr(
      'Una mesa surtida para tu evento, del tamaño que necesites.',
      'An assorted table for your event, whatever its size.',
    ),
    items: [
      { name: tr('Mini pasteles en capas', 'Mini layer cakes') },
      { name: tr('Cuadritos de fruta', 'Fruit squares') },
      { name: tr('Tartaletas, gelatinas y más', 'Tartlets, gelatin cups and more') },
    ],
  },
]

const settings = bilingual({
  businessName: NAME,
  shortName: NAME,
  tagline: tr('Postres hechos a mano', 'Handmade desserts'),
  description: tr(
    'Postres hechos a mano para eventos de cada tamaño: mini cheesecakes, pastelitos de hojaldre con fruta, tartaletas, gelatinas y mesas de postres.',
    'Handmade desserts for events of every size: mini cheesecakes, fruit puff pastries, tartlets, gelatin cups and dessert tables.',
  ),
  // TODO(family): phone, email and WhatsApp number; left empty so nothing fake is ever published.
  phone: null,
  email: null,
  whatsapp: null,
  serviceArea: tr('TODO: ciudad y zona de entrega', 'TODO: city and delivery area'),
  address: { showOnSite: false },
  hours: [{ days: tr('TODO: días', 'TODO: days'), hours: tr('TODO: horario para pedidos', 'TODO: order hours') }],
  socialLinks: [{ platform: 'facebook', url: FACEBOOK }],
  booking: { provider: 'none', buttonLabel: tr('Reservar', 'Book') },
  footerBlurb: tr('Postres hechos a mano para eventos de cada tamaño.', 'Handmade desserts for events of every size.'),
})

const pages = (formId: number) =>
  [
    {
      slug: 'home',
      title: tr('Inicio', 'Home'),
      navOrder: 10,
      meta: {
        title: tr(`${NAME} | Postres hechos a mano para eventos`, `${NAME} | Handmade desserts for events`),
        description: settings.es!.description,
      },
      layout: [
        {
          blockType: 'hero',
          size: 'full',
          showLogo: true,
          heading: NAME,
          tagline: tr('Postres hechos a mano', 'Handmade desserts'),
          subheading: tr(
            '¡Hola a todos! Ofrezco postres hechos a mano para eventos de cada tamaño.',
            'Hi everyone! I make handmade desserts for events of every size.',
          ),
          buttons: [
            { label: tr('Haz tu pedido', 'Request an order'), href: '/order', style: 'primary' },
            { label: tr('Ver postres', 'See the desserts'), href: '/menu', style: 'secondary' },
          ],
        },
        {
          blockType: 'features',
          heading: tr('Dulces para celebrar', 'Sweets for every celebration'),
          items: [
            {
              title: tr('Hechos a mano', 'Handmade'),
              text: tr('Cada postre se prepara a mano y por pedido.', 'Every dessert is made by hand, to order.'),
            },
            {
              title: tr('Para eventos de cada tamaño', 'For events of every size'),
              text: tr(
                'Desde una charola para la familia hasta una mesa de postres completa.',
                'From a tray for the family to a full dessert table.',
              ),
            },
            {
              title: tr('A tu gusto', 'Made your way'),
              text: tr('Cuéntame qué celebras y armamos juntos el menú.', "Tell me what you're celebrating and we'll plan the menu together."),
            },
          ],
        },
        {
          blockType: 'gallery',
          source: 'images',
          heading: tr('Recién hechos', 'Fresh from the kitchen'),
          images: [],
        },
        orderCTA,
      ],
    },
    {
      slug: 'menu',
      title: tr('Postres', 'Menu'),
      navOrder: 20,
      meta: {
        title: tr(`Postres | ${NAME}`, `Menu | ${NAME}`),
        description: tr(
          'Mini cheesecakes, pastelitos de hojaldre con fruta, tartaletas, gelatinas, galletas y mesas de postres para eventos.',
          'Mini cheesecakes, fruit puff pastries, tartlets, gelatin cups, cookies and dessert tables for events.',
        ),
      },
      layout: [
        hero(tr('Postres', 'Desserts'), tr('Todo se hace por pedido', 'Everything is made to order')),
        {
          blockType: 'menu',
          heading: tr('Lo que preparo', 'What I make'),
          intro: tr(
            'Algunos de los postres que preparo para eventos. Pregunta por otros sabores.',
            'Some of the desserts I make for events. Ask about other flavors.',
          ),
          sections: menuSections,
          note: tr(
            'TODO: lista completa de postres, sabores y precios por confirmar.',
            'TODO: full dessert list, flavors and prices to be confirmed.',
          ),
        },
        orderCTA,
      ],
    },
    {
      slug: 'gallery',
      title: tr('Galería', 'Gallery'),
      navOrder: 30,
      meta: {
        title: tr(`Galería | ${NAME}`, `Gallery | ${NAME}`),
        description: tr('Fotos de postres y mesas de postres hechos a mano.', 'Photos of handmade desserts and dessert tables.'),
      },
      layout: [
        hero(tr('Galería', 'Gallery'), tr('Algunos pedidos recientes', 'A few recent orders')),
        {
          blockType: 'gallery',
          source: 'images',
          heading: tr('Mis postres', 'My desserts'),
          images: [],
        },
        {
          blockType: 'cta',
          tone: 'brand',
          heading: tr('Más fotos en Facebook', 'More photos on Facebook'),
          text: tr('Ahí publico los pedidos del día.', 'I post each day’s orders there.'),
          buttons: [{ label: tr('Ver en Facebook', 'See it on Facebook'), href: FACEBOOK }],
        },
      ],
    },
    {
      slug: 'order',
      title: tr('Pedidos', 'Order'),
      navOrder: 40,
      meta: {
        title: tr(`Pedidos | ${NAME}`, `Order | ${NAME}`),
        description: tr(
          'Pide postres hechos a mano para tu evento: cumpleaños, bodas, XV años, baby showers y más.',
          'Order handmade desserts for your event: birthdays, weddings, quinceañeras, baby showers and more.',
        ),
      },
      layout: [
        hero(tr('Haz tu pedido', 'Request an order'), tr('Cuéntame sobre tu evento', 'Tell me about your event')),
        {
          blockType: 'richText',
          heading: tr('Cómo funciona', 'How it works'),
          content: tr(
            doc(
              ul([
                'Llena el formulario con la fecha, el tipo de evento y los postres que te interesan.',
                'Te contacto para confirmar sabores, cantidades y precio.',
                'TODO: anticipación mínima, anticipo, formas de pago y si hay entrega o se recoge.',
              ]),
            ),
            doc(
              ul([
                'Fill in the form with the date, the type of event and the desserts you have in mind.',
                'I get back to you to confirm flavors, quantities and price.',
                'TODO: minimum notice, deposit, payment methods and whether it is delivery or pickup.',
              ]),
            ),
          ),
        },
        {
          blockType: 'contactForm',
          heading: tr('Solicitud de pedido', 'Order request'),
          intro: tr('Respondo lo antes posible.', 'I reply as soon as I can.'),
          form: formId,
          showContactInfo: true,
        },
      ],
    },
    {
      slug: 'about',
      title: tr('Sobre mí', 'About'),
      navOrder: 50,
      meta: {
        title: tr(`Sobre mí | ${NAME}`, `About | ${NAME}`),
        description: settings.es!.footerBlurb,
      },
      layout: [
        hero(tr('Sobre mí', 'About me'), tr('La repostería detrás de cada pedido', 'The baker behind every order')),
        {
          blockType: 'richText',
          anchor: 'historia',
          heading: tr('¡Hola!', 'Hi!'),
          content: tr(
            doc(
              p('Ofrezco postres hechos a mano para eventos de cada tamaño.'),
              p('TODO: unas líneas sobre ella: quién es, desde cuándo hornea, su especialidad y en qué ciudad trabaja.'),
            ),
            doc(
              p('I make handmade desserts for events of every size.'),
              p('TODO: a few lines about her: who she is, how long she has been baking, her specialty and which city she works in.'),
            ),
          ),
        },
        orderCTA,
      ],
    },
  ].map(bilingual)

export const shPoniesDesserts: TenantSeed = {
  tenant,
  media,
  forms: { order: orderForm },
  settings: (refs) => ({
    es: { ...settings.es, logo: refs.media.logo },
    en: { ...settings.en, logo: refs.media.logo },
  }),
  pages: (refs) => pages(refs.forms.order),
}
