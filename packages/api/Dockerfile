FROM node:alpine AS base
WORKDIR /repo

COPY package.json package-lock.json ./
COPY packages/api/package.json packages/api/package.json
COPY packages/common/package.json packages/common/package.json

RUN npm install --omit=dev --workspace=packages/api

FROM base AS build
COPY packages/common packages/common
COPY packages/api packages/api
RUN npm run build --workspace=packages/api || true

FROM node:alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/packages ./packages

WORKDIR /app/packages/api
EXPOSE 3000
CMD ["npm", "run", "start"]
