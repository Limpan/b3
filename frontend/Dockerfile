FROM node:20-alpine3.18 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && \
    npm install -g @angular/cli

COPY . ./

RUN ng build


FROM caddy:2.7.6-alpine as final

WORKDIR /srv

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist/frontend/browser ./

EXPOSE 80
