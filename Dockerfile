# Estágio de compilação
FROM node:14-alpine as builder

WORKDIR /app

COPY package.json ./

RUN npm ci

COPY . .

RUN yarn build

# Estágio de produção
FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm ci

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
