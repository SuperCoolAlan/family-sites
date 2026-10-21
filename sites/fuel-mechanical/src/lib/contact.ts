export const telHref = (phone?: string | null) => {
  const digits = (phone ?? '').replace(/\D/g, '')
  if (!digits) return undefined
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}
