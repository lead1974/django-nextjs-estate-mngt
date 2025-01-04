FROM docker.io/node:20.11-alpine3.18 as base

FROM base as node-build-stage

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base as node-run-stage

ARG APP_HOME=/app
WORKDIR ${APP_HOME}

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=node-build-stage /node_modules ./node_modules

COPY . ${APP_HOME}

# First create the user and group
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001 -G nodejs

# Then create .next directory and set permissions
RUN mkdir -p .next && \
  chown -R nextjs:nodejs ${APP_HOME}/.next && \
  chmod -R 755 ${APP_HOME}/.next && \
  chown -R nextjs:nodejs ${APP_HOME}

USER nextjs

CMD [ "npm","run","dev" ]

