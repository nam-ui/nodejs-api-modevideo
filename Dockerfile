FROM node:16-alpine3.12 as build
RUN apk add --no-cache yarn
WORKDIR /app
COPY . .
RUN yarn --force --silent --cache-folder 
RUN yarn run build
CMD [ "yarn", "start"]

EXPOSE 8080
