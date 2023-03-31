# Define a imagem base
FROM node:14-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package.json ./

# Instala as dependências
RUN npm ci

# Copia o resto dos arquivos
COPY . .

# Define a porta do servidor
EXPOSE 8050

# Inicia a aplicação
CMD [ "npm", "start" ]
