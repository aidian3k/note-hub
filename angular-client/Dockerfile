FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm i --silent

COPY . .
RUN ng build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/angular-client /etc/nginx/html

EXPOSE 80
