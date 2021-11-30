# ------------------------------------------------------
#                       Dockerfile
# ------------------------------------------------------
# image:    <PACKAGE>
# tag:      <COMMIT HASH>
# name:     <PACKAGE>
# how-to:   docker build -t <PACKAGE>:<COMMIT HASH> --build-arg VERSION=<COMMIT HASH> .
# requires: node:16.13-alpine3.12
# authors:  nic.s.pearson@gmail.com
# ------------------------------------------------------

# BUILDER - Artifacts build for production
FROM node:17.1-alpine3.12 AS builder

ARG PACKAGE=unknown
ENV PACKAGE=$PACKAGE

WORKDIR /usr/src/app
RUN chown node:node .
USER node

COPY --chown=node:node . .

RUN yarn workspaces focus ${PACKAGE}
RUN yarn workspace ${PACKAGE} build

# RUNNER - Production image
FROM node:17.1-alpine3.12

ARG PACKAGE=unknown
ENV PACKAGE=$PACKAGE

# Set the NODE_ENV to production
ENV NODE_ENV=production

WORKDIR /usr/src/app
USER node

COPY --chown=node:node --from=builder /usr/src/app/.pnp.cjs ./.pnp.cjs
COPY --chown=node:node --from=builder /usr/src/app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --chown=node:node --from=builder /usr/src/app/.yarn/plugins ./.yarn/plugins
COPY --chown=node:node --from=builder /usr/src/app/.yarn/releases ./.yarn/releases
COPY --chown=node:node --from=builder /usr/src/app/.yarnrc.yml ./.yarnrc.yml
COPY --chown=node:node --from=builder /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=builder /usr/src/app/yarn.lock ./yarn.lock
COPY --chown=node:node --from=builder /usr/src/app/packages/backend/${PACKAGE}/package.json ./packages/backend/${PACKAGE}/package.json
COPY --chown=node:node --from=builder /usr/src/app/packages/backend/${PACKAGE}/dist ./packages/backend/${PACKAGE}/dist

WORKDIR /usr/src/app/packages/backend/${PACKAGE}
RUN yarn workspaces focus --production
CMD yarn workspace ${PACKAGE} start
