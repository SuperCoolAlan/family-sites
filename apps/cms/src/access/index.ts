import type { Access, FieldAccess } from 'payload'

type MaybeUser = { roles?: string[] | null } | null | undefined

export const isSuperAdmin = (user: MaybeUser): boolean =>
  Boolean(user?.roles?.includes('super-admin'))

export const superAdminOnly: Access = ({ req }) => isSuperAdmin(req.user)

export const superAdminField: FieldAccess = ({ req }) => isSuperAdmin(req.user)

export const loggedIn: Access = ({ req }) => Boolean(req.user)

export const anyone: Access = () => true

// Public (static-site builds) only ever sees published docs; editors are tenant-scoped by the plugin.
export const publishedOrLoggedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }
