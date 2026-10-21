// Must not import payload or touch the DB: probes have to pass while migrations run and during DB blips.
export const dynamic = 'force-static'

export const GET = () => Response.json({ status: 'ok' })
