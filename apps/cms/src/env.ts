const trimSlash = (v: string) => v.replace(/\/+$/, '')

const list = (v: string | undefined) =>
  (v ?? '')
    .split(',')
    .map((s) => trimSlash(s.trim()))
    .filter(Boolean)

const smtpFrom = (v: string | undefined) => {
  const m = v?.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  if (m) return { name: m[1] || 'Family Sites', address: m[2] }
  return { name: 'Family Sites', address: v?.trim() || 'no-reply@localhost' }
}

export const env = {
  serverURL: trimSlash(process.env.SERVER_URL || 'http://localhost:3000'),
  databaseURI: process.env.DATABASE_URI || '',
  payloadSecret: process.env.PAYLOAD_SECRET || '',
  corsOrigins: list(process.env.CORS_ORIGINS),

  s3: {
    endpoint: process.env.S3_ENDPOINT || '',
    bucket: process.env.S3_BUCKET || '',
    region: process.env.S3_REGION || 'auto',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  },
  mediaPublicURL: trimSlash(process.env.MEDIA_PUBLIC_URL || ''),

  oidc: {
    enabled: process.env.OIDC_ENABLED !== 'false' && Boolean(process.env.OIDC_CLIENT_ID),
    issuer: process.env.OIDC_ISSUER || '',
    clientId: process.env.OIDC_CLIENT_ID || '',
    clientSecret: process.env.OIDC_CLIENT_SECRET || '',
  },

  turnstileSecret: process.env.TURNSTILE_SECRET_KEY || '',

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 465),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: smtpFrom(process.env.SMTP_FROM),
  },
}
