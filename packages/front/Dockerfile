FROM node:alpine AS build
WORKDIR /repo

# Workspace manifests
COPY package.json package-lock.json ./
COPY packages/front/package.json packages/front/package.json
COPY packages/common/package.json packages/common/package.json

RUN npm install --workspace=packages/front

COPY packages/common packages/common
COPY packages/front packages/front

RUN npm run build --workspace=packages/front

# Minimal runtime container
FROM node:alpine

WORKDIR /front

# Copy built assets only
COPY --from=build /repo/packages/front/dist /front

CMD ["node", "-e", "console.log('Front assets ready')"]