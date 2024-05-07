FROM node:lts AS build-image

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npm prune --production

FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /usr/src/server

COPY --from=build-image /usr/src/server/.env* ./
COPY --from=build-image /usr/src/server/dist ./dist
COPY --from=build-image /usr/src/server/node_modules ./node_modules

ENV NODE_ENV production

EXPOSE 4201

CMD ["node", "dist/main"]

