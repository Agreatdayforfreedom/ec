FROM node:20-alpine

WORKDIR /app/client

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i

COPY . /

EXPOSE 5173