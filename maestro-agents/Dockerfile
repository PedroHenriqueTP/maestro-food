FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Instalar dependências base
COPY package*.json ./
RUN npm install

# Copiar scripts dos agentes
COPY . .

# Dar permissão de execução ao entrypoint
RUN chmod +x entrypoint.sh

# Rodar o loop de autonomia
CMD ["./entrypoint.sh"]
