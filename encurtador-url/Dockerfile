## Baixa a imagem do node com versão latest
FROM node:latest

RUN mkdir -p /home/docker/app

## Define o local onde o app vai ficar no disco do container
WORKDIR /home/docker/app

## Copia tudo que começa com package e termina com .json para dentro da pasta /home/docker/app
COPY package*.json ./

## Executa npm install para adicionar as dependências e criar a pasta node_modules
RUN npm install

## Copia tudo que está no diretório onde o arquivo Dockerfile está 
## para dentro da pasta /usr/app do container
## Vamos ignorar a node_modules por isso criaremos um .dockerignore
COPY . .

## Container ficará ouvindo os acessos na porta 3000
EXPOSE 3000

## Não se repete no Dockerfile
## Executa o comando npm start para iniciar o script que que está no package.json
CMD npm start

