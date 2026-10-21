// Minimal Lexical JSON -> HTML for the node types the CMS editor produces; unknown nodes render their children.
type LexNode = {
  type: string
  children?: LexNode[]
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  url?: string
  fields?: { url?: string; newTab?: boolean; linkType?: string }
  value?: { url?: string; alt?: string } | number
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const safeHref = (href = '') => (/^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : '#')

const FORMATS: [number, string][] = [
  [1, 'strong'],
  [2, 'em'],
  [4, 's'],
  [8, 'u'],
  [16, 'code'],
  [32, 'sub'],
  [64, 'sup'],
]

const text = (n: LexNode) => {
  let out = esc(n.text ?? '')
  const f = typeof n.format === 'number' ? n.format : 0
  for (const [bit, tag] of FORMATS) if (f & bit) out = `<${tag}>${out}</${tag}>`
  return out
}

const render = (n: LexNode): string => {
  const kids = (n.children ?? []).map(render).join('')
  switch (n.type) {
    case 'root':
      return kids
    case 'text':
      return text(n)
    case 'linebreak':
      return '<br>'
    case 'paragraph':
      return `<p>${kids}</p>`
    case 'heading': {
      const tag = /^h[1-6]$/.test(n.tag ?? '') ? n.tag : 'h2'
      return `<${tag}>${kids}</${tag}>`
    }
    case 'quote':
      return `<blockquote>${kids}</blockquote>`
    case 'list':
      return n.listType === 'number' ? `<ol>${kids}</ol>` : `<ul>${kids}</ul>`
    case 'listitem':
      return `<li>${kids}</li>`
    case 'horizontalrule':
      return '<hr>'
    case 'link':
    case 'autolink': {
      const href = safeHref(n.fields?.url ?? n.url)
      const blank = n.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${esc(href)}"${blank}>${kids}</a>`
    }
    case 'upload': {
      const v = typeof n.value === 'object' ? n.value : undefined
      return v?.url ? `<img src="${esc(v.url)}" alt="${esc(v.alt ?? '')}" loading="lazy">` : ''
    }
    default:
      return kids
  }
}

export const richTextToHTML = (value: unknown): string => {
  const root = (value as { root?: LexNode } | null | undefined)?.root
  return root ? render(root) : ''
}
