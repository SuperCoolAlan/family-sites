// Refreshes src/content-snapshot.json (the build fallback) from a running CMS.
// Usage: PAYLOAD_URL=https://cms.asandov.com TENANT_SLUG=sh-ponies-desserts pnpm snapshot
import { writeFile } from 'node:fs/promises'

import { fetchContent, stripLocalMedia } from '../src/lib/load-content.mjs'

// Keep in sync with LOCALES in src/i18n.ts.
const LOCALES = ['es', 'en']
const url = process.env.PAYLOAD_URL || 'http://localhost:3000'
const slug = process.env.TENANT_SLUG || 'sh-ponies-desserts'

const content = stripLocalMedia(await fetchContent(url, slug, LOCALES))
const out = new URL('../src/content-snapshot.json', import.meta.url)
await writeFile(out, JSON.stringify(content, null, 2) + '\n')
console.log(`wrote ${out.pathname} from ${url} (${LOCALES.map((l) => `${l}: ${content.locales[l].pages.length} pages`).join(', ')})`)
