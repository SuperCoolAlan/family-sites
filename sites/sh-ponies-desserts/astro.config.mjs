import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://poniesdesserts.asandov.com',
  // Spanish is the default language; public/_redirects does the same with a real HTTP redirect on Pages.
  redirects: { '/': '/es/' },
  server: { port: 4322 },
})
