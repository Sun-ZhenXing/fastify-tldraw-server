ARG NODE_VERSION=22.11.0
ARG NPM_REGISTRY=https://registry.npmjs.org

# Builder image
FROM node:${NODE_VERSION}-bookworm AS builder
ARG NPM_REGISTRY
ENV NODE_OPTIONS=--max-old-space-size=4096
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm -v && \
    npm config set registry ${NPM_REGISTRY} && \
    npm install -g pnpm && \
    pnpm -v && \
    pnpm config set registry ${NPM_REGISTRY} && \
    pnpm install --ignore-scripts

COPY . ./

RUN mv .env.production .env && \
    pnpm install && \
    pnpm build

RUN mv package.json dist/ && \
    mv pnpm-lock.yaml dist/ && \
    mv .env dist/ && \
    mv tsconfig.json dist/ && \
    cd dist/ && \
    pnpm i --prod --ignore-scripts

# Production image
FROM node:${NODE_VERSION}-bookworm-slim
WORKDIR /app

COPY --from=builder /app/dist /app

EXPOSE 5858
CMD ["node", "index.js"]
