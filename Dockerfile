FROM node:16-alpine3.12 as build
RUN apk add --no-cache yarn
WORKDIR /app
COPY . .
RUN yarn
CMD [ "yarn", "run dev" ]

EXPOSE 8080
