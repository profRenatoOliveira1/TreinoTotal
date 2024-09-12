FROM node:20

# Instalar o cliente PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Configurações do diretório e permissões
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos
COPY --chown=node:node . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "app.js" ]
