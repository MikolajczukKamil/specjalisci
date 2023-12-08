FROM node:lts-iron AS builder
WORKDIR /app
COPY . /app
RUN npm ci --loglevel verbose
RUN npx ng build --configuration production --output-path /app/frontend

FROM nginx:stable-perl
COPY --from=builder /app/frontend /usr/share/nginx/html
EXPOSE 80
