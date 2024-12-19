FROM node:23-alpine
COPY ./.output /app
WORKDIR /app

ENTRYPOINT ["node", "./output/server/index.mjs"]