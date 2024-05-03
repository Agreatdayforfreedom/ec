FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

RUN npm install -g pnpm && npm install -g @nestjs/cli

RUN pnpm i

COPY . /

EXPOSE 4000