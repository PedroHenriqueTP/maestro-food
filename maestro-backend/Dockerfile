# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copia dependências primeiro para cache do Docker
COPY package*.json ./
# Ignorar dependências do NestJS caso seja só setup inicial, mas como o package.json será populado:
RUN npm install

# Copia o código e gera o Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copia resto do código e faz o build
COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine

WORKDIR /app

# Copia apenas os arquivos necessários para produção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

# Variáveis de ambiente padrão (sobrescritas no docker-compose)
ENV NODE_ENV=production
ENV PORT=3001

CMD ["npm", "run", "start:prod"]
