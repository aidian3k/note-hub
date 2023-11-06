FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm i --silent

COPY . .

ENTRYPOINT ["npm", "start"]
