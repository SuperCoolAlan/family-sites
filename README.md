# family-sites

A self-hosted [Payload CMS](https://payloadcms.com) that family members use to edit their small-business websites. Each website is a static [Astro](https://astro.build) build hosted on Cloudflare Pages.

```
 editors ──SSO (Authentik)──▶ cms.asandov.com  (Payload 3 on Next.js, homelab k8s via Cloudflare tunnel)
                                   │   ├─ Postgres (CNPG)               content
                                   │   └─ Cloudflare R2 (S3 API)        media uploads
                                   │
              publish ─ debounced POST ─▶ Cloudflare Pages deploy hook (per site)
                                                   │
                                                   ▼
                         Pages build: astro build ─ GET published content from /api ─▶ static HTML
                                                   │  (falls back to src/content-snapshot.json)
 visitors ─▶ fuelmechanical.asandov.com  (static) ─┤  images straight from the R2 public domain
 visitors ─▶ poniesdesserts.asandov.com (static) ─┘  contact/order form POST /api/form-submissions (Turnstile)
```

- `apps/cms` contains Payload 3 with the Postgres adapter and S3 storage (R2). It uses the official multi-tenant, form-builder and nodemailer packages, plus `payload-oauth2` for Authentik SSO.
- `sites/fuel-mechanical` is the first site: Fuel Mechanical LLC. Its design and copy were ported from the earlier SvelteKit draft. It is English only.
- `sites/sh-ponies-desserts` is S&H Ponie’s Desserts, a home bakery that makes handmade desserts for events. It is bilingual: Spanish (the default) at `/es/…` and English at `/en/…`, and `/` redirects to `/es/`.
- One tenant equals one site. Editors only see the tenants a super-admin has assigned to them.

## How content flows

| Collection / global | Notes |
| --- | --- |
| Pages | `slug`, `title`, SEO group, `navOrder` (sets the menu order), and a `layout` of blocks. The blocks are Hero, Rich Text, Services Grid, Feature cards, Gallery, Testimonials, CTA, Contact Form, Booking Embed, FAQ and Menu / price list. Pages have drafts and versions. |
| Services | Title, summary, icon, image and rich text. Drafts are supported. |
| Portfolio (projects) | Cover image, photo gallery, category, location and date. Each project gets its own page at `/portfolio/<slug>`. |
| Media | Alt text is required. Sizes are `thumbnail`, `card` and `hero`, all WebP. Files are stored in R2 and served from `MEDIA_PUBLIC_URL`. |
| Site Settings | There is exactly one per tenant. It holds the business name, logos, phone, email, WhatsApp number, address, hours, service area, social links, booking embed and footer. |
| Forms / Form submissions | Provided by the form-builder plugin, with the date field turned on. Submissions are tenant-scoped. They are optionally emailed when SMTP is set. |
| Sites (tenants) | Name, slug, domain, languages and the Pages deploy hook URL. Only super-admins can read the hook URL. |

**Languages.** Payload localization is on, with `es` (Spanish) as the default locale and `en`. Each locale falls back to the other.
- Text fields are localized: titles, headings, copy, button labels, alt text, captions, hours, form labels and so on. Structure is shared across languages: slugs, links, images, block order and relations. Editors therefore translate a page rather than build a second one.
- A tenant's **Languages** field limits the admin's language picker for that site. Fuel Mechanical is `en` only; S&H Ponie’s Desserts is `es` and `en`. The API still serves every locale.
- Sites must always request `?locale=…`. Payload applies its fallbacks only when a locale is named, so a request without one returns the bare default-locale (es) values. Fuel Mechanical's site sends `locale=en`, and the bakery site fetches once per language.
- The form-builder plugin doesn't localize a select field's placeholder. Leave it empty and let the site supply one per language.

**Read access.** Anonymous requests only ever see *published* pages, services and projects. They can also read media, forms, site settings and the tenant list, minus the deploy hook field. This anonymous view is everything a Pages build needs.

**Deploys.** When a page, service, project, site setting, form or media item is published, unpublished or deleted, the CMS waits 60 s, collapsing a burst of edits into one rebuild. It then POSTs that tenant's Pages deploy hook. Draft saves and autosaves never trigger a build. The seed script never triggers one either.

**Contact form.** The site POSTs JSON straight to `/api/form-submissions`. The CMS rejects a submission before touching the database in any of these cases:
- the honeypot field (`website`) is filled in;
- the request is malformed or oversized;
- the client IP (`CF-Connecting-IP`) has sent more than 5 submissions in 10 minutes;
- the Cloudflare Turnstile token fails verification.

The submission's tenant is always taken from its form, never from the request body.

**Live preview.** Not implemented. Pages are plain static builds, so editors use **Save draft** and then **Publish**, and see the change on the live site about two minutes later.

## Auth

- **Editors** click *Sign in with Authentik* on the login page. That flow runs `/api/users/oauth/start`, then Authentik, then `/api/users/oauth/callback`.
  - Users are matched on the OIDC `sub` claim, never on email, because Authentik users can edit their own email. The Authentik email is stored only for reference.
  - The Payload login email for an SSO user is a synthetic `<sub>@sso.invalid`. This means SSO users can't use password login or password reset.
  - New SSO users are created as `editor` with **no tenants**. They see nothing until a super-admin opens **Admin → Users** and adds a site under *Tenants*.
- **Break-glass access.** The first local account is always a `super-admin` with email and password. It is either created on Payload's create-first-user screen, or by the seed script when `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set. Keep its password in a password manager.
- The OAuth `state` parameter is checked against an HttpOnly cookie. `payload-oauth2` doesn't do this check itself; `src/auth/oidc.ts` adds it.

The Authentik provider needs these settings. They follow the same pattern as the mealie blueprint in homelab-manifests:

- client type: confidential
- `grant_types: [authorization_code, refresh_token]`
- redirect URI: strict `https://cms.asandov.com/api/users/oauth/callback`
- scopes: `openid`, `email`, `profile`
- `sub_mode: hashed_user_id`
- application slug `cms`, so the issuer is `https://auth.asandov.com/application/o/cms/`

## Local development

Requirements: Node ≥ 22.23 (`.nvmrc` pins 24), pnpm 10 (`corepack enable`), and Docker.

```sh
docker compose up -d                 # postgres :5432, SeaweedFS S3 :9000 (+ bucket), see note below
cp apps/cms/.env.example apps/cms/.env          # then set PAYLOAD_SECRET=$(openssl rand -hex 32)
cp sites/fuel-mechanical/.env.example sites/fuel-mechanical/.env
pnpm install
pnpm --filter @family-sites/cms migrate          # dev uses the same committed migrations as prod (push is off)
pnpm seed                                        # break-glass admin + Fuel Mechanical content; safe to re-run
pnpm dev:cms                                     # http://localhost:3000/admin
pnpm --filter fuel-mechanical dev                # http://localhost:4321
cp sites/sh-ponies-desserts/.env.example sites/sh-ponies-desserts/.env
pnpm --filter sh-ponies-desserts dev             # http://localhost:4322 (redirects to /es/)
```

Notes:

- **Why SeaweedFS instead of MinIO.** MinIO no longer publishes container images, so local S3 is SeaweedFS. Its `dev/s3.json` gives anonymous users read-only access, which mirrors an R2 public bucket.
- **Changing the schema.** After editing collections, run `pnpm --filter @family-sites/cms migrate:create <name>` and commit the new file in `src/migrations`. Also run `generate:types`, and run `generate:importmap` if admin components changed.
- **Testing the contact form locally.** Use Cloudflare's always-pass test keys: site key `1x00000000000000000000AA` and secret `1x0000000000000000000000000000000AA`.
- **Re-running the seed.** The seed is idempotent, but it resets every seeded page, form and settings document to the seed's content. Once a family member has edited a site in the CMS, don't re-run the seed against that database.
- **Refreshing the snapshot.** `PAYLOAD_URL=https://cms.asandov.com pnpm --filter fuel-mechanical snapshot` (or `--filter sh-ponies-desserts`) updates the site's fallback snapshot. Do this from **production**: IDs (such as the contact form's ID) and media URLs must match production. Snapshots taken from a local CMS drop all `localhost` media.

## Importing photos

`import-media` uploads a folder of photos as one tenant's Media (R2 in production):

```sh
pnpm --filter cms import-media sh-ponies-desserts ~/Pictures/ponies            # upload only
pnpm --filter cms import-media sh-ponies-desserts ~/Pictures/ponies gallery    # also add them to /gallery
```

- It accepts `jpg`, `png`, `webp`, `avif`, `gif` and `tiff` files. A relative folder resolves from the directory you ran `pnpm` in.
- Each photo gets placeholder alt text in each of the tenant's languages, for example `TODO: describir la foto (IMG_0412.jpg)`. To supply real alt text up front, put an `alt.json` in the folder: `{ "IMG_0412.jpg": { "es": "Mesa de postres para un bautizo", "en": "Dessert table for a baptism" } }`.
- A photo whose filename the tenant already has is skipped, so re-running the import is safe.
- With a page slug as the third argument, the new photos are appended to that page's first hand-picked photo gallery. They are saved as a **draft**, so nothing goes live until an editor fixes the alt text and clicks **Publish**. The import never triggers a deploy.
- To run it against production, use the same environment as the CMS: `DATABASE_URI` (for example through `kubectl port-forward` to the CNPG service), `PAYLOAD_SECRET`, and the `S3_*` and `MEDIA_PUBLIC_URL` variables.

## Deploying the CMS

- **Image.** The image is `ghcr.io/supercoolalan/family-sites-cms`. It is built by `.github/workflows/build-cms.yml` for `linux/amd64`. Pushing a git tag `v0.1.0` publishes image tag `0.1.0`, plus `0.1`, `latest` (main) and `sha-…`. The digest is written to the job summary. New GHCR packages start private, so flip the package to Public once.
- **Runtime.** The container runs `node server.js` in `/app/apps/cms` as uid/gid 1001 on port 3000.
  - It works with `readOnlyRootFilesystem` if `/tmp` and `/app/.next/cache` are writable emptyDirs.
  - Probes: `GET /api/health` returns `{"status":"ok"}`. It is static and never touches the DB, so use it for liveness and readiness. Add a startup probe with a long timeout, because migrations run on first boot.
- **Migrations.** These run automatically on boot through the postgres adapter's `prodMigrations`. They have no cross-pod lock, so run **one replica** with `strategy: Recreate`.

### Environment

| Variable | Secret | Example / source |
| --- | --- | --- |
| `DATABASE_URI` | yes | CNPG app secret key `uri`, e.g. `postgresql://payload:…@cms-postgres-rw.cms:5432/payload` |
| `PAYLOAD_SECRET` | yes | `openssl rand -hex 32`. Signs sessions; rotating it logs everyone out. |
| `SERVER_URL` | no | `https://cms.asandov.com`, with no trailing slash. Used to build the OIDC redirect URI. |
| `CORS_ORIGINS` | no | Comma-separated list of site origins: `https://fuelmechanical.asandov.com,https://poniesdesserts.asandov.com`. `SERVER_URL` is always allowed. |
| `S3_ENDPOINT` | no¹ | `https://<account-id>.r2.cloudflarestorage.com`. Uploads are disabled while it is unset. |
| `S3_BUCKET` | no | `cms-asandov-com` |
| `S3_REGION` | no | `auto` |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | yes | R2 API token with Object Read & Write on the bucket |
| `S3_FORCE_PATH_STYLE` | no | `true` only for local SeaweedFS. Leave it unset for R2. |
| `MEDIA_PUBLIC_URL` | no | `https://media.asandov.com`, the R2 public custom domain. Media URLs are built from it and nothing fetches it. |
| `OIDC_ISSUER` | no | `https://auth.asandov.com/application/o/cms/` |
| `OIDC_CLIENT_ID` / `OIDC_CLIENT_SECRET` | yes | Authentik provider `cms`. SSO is hidden while the client ID is empty. |
| `OIDC_ENABLED` | no | Set `false` to turn SSO off without removing the secret. |
| `TURNSTILE_SECRET_KEY` | yes | From the Turnstile widget. While it is unset, every public form submission is rejected. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_FROM` | no | Optional. When `SMTP_HOST` is empty, mail is logged instead of sent. `SMTP_FROM` takes the form `Name <addr>`. |
| `SMTP_PASS` | yes | Optional. |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | yes | Used only by the seed script, never by the container. |

¹ The endpoint isn't secret, but it contains the Cloudflare account ID.

## Cloudflare Pages (per site)

Create the Pages project with *Connect to Git* on this repo. `<site>` is the folder and package name: `fuel-mechanical` or `sh-ponies-desserts`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `sites/<site>` |
| Build command | `cd ../.. && pnpm install --frozen-lockfile --filter <site> && pnpm --filter <site> build` |
| Build output directory | `dist` |
| Build watch paths (optional) | `sites/<site>/*` |

Build environment variables:

| Variable | Fuel Mechanical | S&H Ponie’s Desserts |
| --- | --- | --- |
| `NODE_VERSION` | `24` | `24` (Astro 7 needs ≥ 22.23; the Pages v3 image defaults to 22.16) |
| `PNPM_VERSION` | `10.34.7` | `10.34.7` |
| `SKIP_DEPENDENCY_INSTALL` | `1` | `1` (the build command installs from the workspace root instead) |
| `PAYLOAD_URL` | `https://cms.asandov.com` | `https://cms.asandov.com` |
| `TENANT_SLUG` | `fuel-mechanical` | `sh-ponies-desserts` |
| `SITE_URL` | `https://fuelmechanical.asandov.com` | `https://poniesdesserts.asandov.com` |
| `PUBLIC_PAYLOAD_URL` | `https://cms.asandov.com` | `https://cms.asandov.com` (the form posts here) |
| `PUBLIC_TURNSTILE_SITE_KEY` | The widget's site key | The same widget's site key (public) |

The bakery site's languages are set in code, not in an environment variable: `LOCALES` in `src/i18n.ts`, with the first entry as the default. Its UI strings live in the same file. `public/_redirects` sends `/` to `/es/` with an HTTP redirect.

Then:

1. Add the custom domain (`fuelmechanical.asandov.com` or `poniesdesserts.asandov.com`).
2. Under *Settings → Builds → Deploy hooks*, create a hook for `main`.
3. Paste the hook URL into the tenant's **Cloudflare Pages deploy hook URL** in the CMS.

If the CMS is unreachable during a build, the build logs a warning and renders `src/content-snapshot.json` instead, so a homelab outage never fails a deploy. In that case the contact form still points at the CMS.

**Public endpoints.** If Cloudflare Access protects `cms.asandov.com`, it must not cover these:
- `GET /api/*`, used anonymously by builds;
- `POST` and `OPTIONS` on `/api/form-submissions`;
- `/api/users/oauth/*`.

## Adding a new family site

1. **Create the tenant.** In the CMS, open **Admin → Sites → Create** and set a name, a slug (for example `aunt-bakery`), the domain and its languages.
2. **Fill in the content.** Switch the tenant selector to the new site, then create Site Settings, upload a logo, add pages (`home` is required, and `navOrder` sets the menu), services and a contact form. Alternatively, add a seed module like `apps/cms/src/seed/sh-ponies-desserts.ts` (bilingual, built with `tr()`) or `fuel-mechanical.ts` (single language) and list it in `seed/index.ts`.
3. **Give the editor access.** The family member signs in once with Authentik, which creates their user. A super-admin then adds the tenant to that user under *Tenants*.
4. **Create the site code.** Copy `sites/fuel-mechanical` (one language) or `sites/sh-ponies-desserts` (several languages) to `sites/<slug>`, then:
   - change the `name` in its `package.json`;
   - change the brand colours in `src/styles/global.css` and the logos in `public/`;
   - update `TENANT_SLUG` and `SITE_URL` in `.env.example`.

   Then run `pnpm install` and `pnpm snapshot` (against production) and commit.
5. **Create the Pages project** using the table above with the new root directory and filter, and add the domain.
6. **Wire up the deploy hook.** Create a deploy hook and paste it into the tenant.
7. **Allow the form.** Add the site's origin to `CORS_ORIGINS` and add its hostname to the Turnstile widget.

### Bringing S&H Ponie’s Desserts live

1. **Load the content.** Deploy a CMS image built from this commit; migrations run on boot. Then create the tenant's content in production, either by running `pnpm seed` against production or by entering it in the admin. Remember that the seed also resets Fuel Mechanical's seeded pages.
2. **Refresh the snapshot.** The committed `sites/sh-ponies-desserts/src/content-snapshot.json` was taken from a local CMS. Refresh it from production so the order form's ID and the media URLs match.
3. **Create the Pages project** using the table above, then add the domain `poniesdesserts.asandov.com` and the deploy hook.
4. **Allow the site.** Add `poniesdesserts.asandov.com` to the Turnstile widget. `CORS_ORIGINS` in homelab-manifests already includes the origin.
5. **Add the photos.** Upload them with `import-media` (see above) rather than committing them; this repo is public.

## Accounts to set up (outside this repo)

- **GitHub.** Push the repo and make the `family-sites-cms` GHCR package public.
- **Cloudflare R2.**
  - Bucket `cms-asandov-com`.
  - Public custom domain `media.asandov.com`.
  - API token scoped to Object Read & Write on that bucket.
  - A CORS rule is only needed if browser uploads are enabled later; they currently go through the CMS.
- **Cloudflare Pages.** One project per site, plus a deploy hook and environment variables as above.
- **Cloudflare Turnstile.** One widget covering every site hostname, which gives one site key and one secret.
- **Authentik.** The `cms` OIDC provider and application.
