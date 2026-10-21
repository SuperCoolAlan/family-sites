import type { Media } from '@cms-types'

type SizeName = keyof NonNullable<Media['sizes']>

export const mediaURL = (m: Media | number | null | undefined, size?: SizeName): string | undefined => {
  if (!m || typeof m !== 'object') return undefined
  return (size && m.sizes?.[size]?.url) || m.url || undefined
}

export const srcset = (m: Media | number | null | undefined): string | undefined => {
  if (!m || typeof m !== 'object' || !m.sizes) return undefined
  const parts = Object.values(m.sizes)
    .filter((s): s is { url: string; width: number } => Boolean(s?.url && s?.width))
    .map((s) => `${s.url} ${s.width}w`)
  return parts.length ? parts.join(', ') : undefined
}
