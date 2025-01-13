FROM node:22.13.0

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 4000

# Comando para rodar o servidor
CMD ["npx", "ts-node", "server.ts"]
