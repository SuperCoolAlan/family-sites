// Hosts editors may embed; anything else is rejected so an editor can't inject arbitrary third-party code.
export const BOOKING_HOSTS = [
  'book.squareup.com',
  'squareup.com',
  'square.site',
  'calendly.com',
] as const

export const isAllowedBookingURL = (value: string): boolean => {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return false
    return BOOKING_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))
  } catch {
    return false
  }
}
