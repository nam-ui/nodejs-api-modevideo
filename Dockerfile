FROM node:16-alpine3.12 as build
RUN apk add --no-cache yarn
WORKDIR /app
COPY . .
RUN yarn run build
CMD [ "yarn", "start" ]

FROM nginx
COPY /nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 8080
