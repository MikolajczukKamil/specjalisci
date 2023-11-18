FROM node:lts-iron
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@16.2.7
CMD ["ng serve", "src/index.js"]
EXPOSE 4200
