FROM node:10.7.0-alpine as builder

WORKDIR /app

COPY public ./public
COPY src ./src
COPY .env.production .
COPY package.json .

RUN yarn install && yarn run build

# Runtime Image
FROM nginx:1.14.0-alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY default.conf /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
