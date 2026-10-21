# Build from the repo root: docker build -f apps/cms/Dockerfile .
FROM node:24.22.1-alpine3.24 AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

FROM base AS deps
WORKDIR /repo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json apps/cms/
RUN pnpm install --frozen-lockfile --filter @family-sites/cms...

FROM base AS builder
WORKDIR /repo
COPY --from=deps /repo ./
COPY apps/cms apps/cms
RUN pnpm --filter @family-sites/cms build

FROM node:24.22.1-alpine3.24 AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
WORKDIR /app
# Standalone output keeps the monorepo layout, so the server lives in apps/cms.
COPY --from=builder --chown=nextjs:nodejs /repo/apps/cms/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/cms/.next/static ./apps/cms/.next/static
# k8s mounts an emptyDir at /app/.next/cache (read-only root FS); point Next's cache dir at it.
RUN mkdir -p /app/.next/cache && chown nextjs:nodejs /app/.next/cache \
    && ln -s /app/.next/cache /app/apps/cms/.next/cache
USER 1001:1001
WORKDIR /app/apps/cms
EXPOSE 3000
CMD ["node", "server.js"]
