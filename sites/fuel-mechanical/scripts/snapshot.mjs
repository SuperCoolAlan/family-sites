// Refreshes src/content-snapshot.json (the build fallback) from a running CMS.
// Usage: PAYLOAD_URL=https://cms.asandov.com TENANT_SLUG=fuel-mechanical pnpm snapshot
import { writeFile } from 'node:fs/promises'

import { fetchContent, stripLocalMedia } from '../src/lib/load-content.mjs'

const url = process.env.PAYLOAD_URL || 'http://localhost:3000'
const slug = process.env.TENANT_SLUG || 'fuel-mechanical'

const content = stripLocalMedia(await fetchContent(url, slug))
const out = new URL('../src/content-snapshot.json', import.meta.url)
await writeFile(out, JSON.stringify(content, null, 2) + '\n')
console.log(`wrote ${out.pathname} from ${url} (${content.pages.length} pages)`)
