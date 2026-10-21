// Minimal Lexical JSON builders so seed content is editable in the admin's rich text editor.
type Node = { type: string; version: number; [k: string]: unknown }

const text = (t: string, format = 0): Node => ({
  type: 'text',
  text: t,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = (type: string, children: Node[], extra: Record<string, unknown> = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

export const p = (t: string) => block('paragraph', [text(t)], { textFormat: 0, textStyle: '' })
export const h = (tag: 'h2' | 'h3', t: string) => block('heading', [text(t)], { tag })
export const ul = (items: string[]) =>
  block(
    'list',
    items.map((t, i) => block('listitem', [text(t)], { value: i + 1 })),
    { listType: 'bullet', start: 1, tag: 'ul' },
  )

export const doc = (...children: Node[]) => ({
  root: { type: 'root', children, direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 },
})
