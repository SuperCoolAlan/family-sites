// Editors type hrefs by hand; anything that isn't a path, anchor, http(s), mailto or tel is neutralised.
export const safeHref = (href?: string | null) => (href && /^(https?:|mailto:|tel:|\/|#)/i.test(href) ? href : '#')

export const isExternal = (href?: string | null) => Boolean(href && /^https?:/i.test(href))
