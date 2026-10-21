const digits = (v?: string | null) => (v ?? '').replace(/\D/g, '')

export const telHref = (phone?: string | null) => {
  const d = digits(phone)
  if (!d) return undefined
  return `tel:+${d.length === 10 ? `1${d}` : d}`
}

// wa.me wants the full international number without "+" or punctuation.
export const whatsappHref = (number?: string | null, text?: string) => {
  const d = digits(number)
  if (!d) return undefined
  const n = d.length === 10 ? `1${d}` : d
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
