const port = 3003

const bodyParser = require('body-parser') //criando instância de body-parser
const express = require('express') //criando instância do express
const server = express() //iniciando servidor express
const allowCors = require('./cors') //habilitando módulo cors para permitir que o front conecte
const queryParser = require('express-query-int') //lê o que vem da query string para fazer o parse para int quando necessário

server.use(bodyParser.urlencoded({ extended: true })) //se a requisição for dado de formulário, realiza o parse para objeto de url
server.use(bodyParser.json()) //se não for urlencoded e for json, faz o parse do json para objeto
server.use(allowCors) //permitindo CORS
server.use(queryParser())

server.listen(port, function(){
    console.log(`BACKEND está rodando na porta: ${port}.`)
})

module.exports = server