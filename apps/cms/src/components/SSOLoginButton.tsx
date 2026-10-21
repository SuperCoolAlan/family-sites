import React from 'react'

export const SSOLoginButton = () => {
  if (process.env.OIDC_ENABLED === 'false' || !process.env.OIDC_CLIENT_ID) return null
  return (
    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
      {/* Plain <a>: the start endpoint 302s to Authentik, which client-side routing can't follow. */}
      <a className="btn btn--style-primary btn--size-large" href="/api/users/oauth/start" style={{ width: '100%' }}>
        Sign in with Authentik
      </a>
      <p style={{ marginTop: '0.75rem', opacity: 0.7, fontSize: '0.85rem' }}>
        Family editors: use this button. The email/password form is for the site administrator.
      </p>
    </div>
  )
}

export default SSOLoginButton
