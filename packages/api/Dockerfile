FROM node:alpine AS build

WORKDIR /repo

COPY package.json package-lock.json ./
COPY packages/common packages/common
COPY packages/api packages/api

RUN npm install --workspace=packages/api
RUN npm run build --workspace=packages/api
RUN npm prune --omit=dev --workspace=packages/api

FROM node:alpine
WORKDIR /app

COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/packages ./packages

WORKDIR /app/packages/api
CMD ["npm", "run", "start"]
