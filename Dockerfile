# syntax=docker/dockerfile:1

FROM node:current-alpine3.14

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i -g nodemon

RUN npm install

COPY . .

CMD [ "nodemon", "index.js" ]