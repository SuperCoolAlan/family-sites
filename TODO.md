# TODO

Parked 2026-10-21. Both sites are live with an under-construction banner.

## Search
- [ ] Add `@astrojs/sitemap` and a `robots.txt` that points to the sitemap, for both sites.
- [ ] Add fuelmechanical.asandov.com and poniesdesserts.asandov.com to Google Search Console (DNS verification through Cloudflare), then submit the sitemaps.

## Form email
- [ ] Choose an SMTP account to send from and set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `SMTP_FROM` on the CMS.
- [ ] Set a recipient on each form: Fuel Mechanical's contact form goes to the business inbox, and the S&H Ponie's Desserts order form goes to the owner.
- [ ] Optional: a Cloudflare-side fallback that emails a submission when the CMS is unreachable. Today a submission fails if the homelab is down.

## Content from the family
- [ ] **S&H Ponie's Desserts:**
  - phone, email and WhatsApp
  - city and delivery area
  - hours
  - prices and flavors
  - order rules: notice, deposit, payment, pickup or delivery
  - the About story
  - order notification email
- [ ] **S&H Ponie's Desserts:** rename the photos whose alt text is generic (for example "pan dulce horneado" or "galletas caseras").
- [ ] **Fuel Mechanical:** review the placeholder copy for Air Quality, Industrial Air Handlers and Commercial HVAC.
- [ ] **Fuel Mechanical:** add locations, dates and details to the six portfolio projects, then delete the three draft placeholder projects.

## Access
- [ ] Each family member signs in once with Authentik. A super-admin then assigns the tenant (`fuel-mechanical` or `sh-ponies-desserts`) under Users.

## Later
- [ ] Remove the banners: set `PUBLIC_CONSTRUCTION_BANNER=off` in each Pages project and redeploy.
- [ ] Nightly copy of the R2 media bucket to Backblaze B2.
