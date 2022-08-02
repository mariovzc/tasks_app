# syntax=docker/dockerfile:1

FROM node:alpine3.16

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --no-cache python3 g++ make

RUN yarn

COPY . .

CMD [ "nodemon", "index.js" ]
