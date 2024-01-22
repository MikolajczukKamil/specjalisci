FROM node:lts-iron AS builder
WORKDIR /app
COPY . /app
RUN npm ci --loglevel verbose
RUN npx ng build --configuration production --output-path /app/frontend

FROM nginx:stable-perl
COPY --from=builder /app/frontend /usr/share/nginx/html
# ADD TLS cert and key
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./server_prd.crt /etc/nginx/ssl/server.crt
COPY ./server_prd.key /etc/nginx/ssl/server.key

EXPOSE 443
