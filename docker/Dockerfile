ARG NODE_VERSION=22.2.0
ARG NPM_REGISTRY=https://registry.npmjs.org
ARG DEBIAN_MIRROR=deb.debian.org

# Builder image
FROM node:${NODE_VERSION}-bookworm AS builder
ARG NPM_REGISTRY
WORKDIR /app

COPY . ./

ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm -v && \
    npm config set registry ${NPM_REGISTRY} && \
    npm i -g pnpm && \
    pnpm -v && \
    pnpm config set registry ${NPM_REGISTRY} && \
    mv .env.production .env && \
    pnpm i
RUN pnpm build
RUN mv package.json dist/ && \
    mv pnpm-lock.yaml dist/ && \
    mv .env dist/ && \
    mv tsconfig.json dist/ && \
    cd dist/ && \
    pnpm i --prod --ignore-scripts && \
    rm -rf pnpm-lock.yaml

# Production image
FROM node:${NODE_VERSION}-bookworm-slim
ARG DEBIAN_FRONTEND=noninteractive
ARG DEBIAN_MIRROR
WORKDIR /app

COPY --from=builder /app/dist /app

EXPOSE 5858
CMD ["node", "index.js"]
