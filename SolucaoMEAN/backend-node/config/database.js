const mongoose = require('mongoose')

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/picpay' //se não encontrar a url de conexão com o mongo nas variáveis de ambiente, tento a padrão local mesmo
mongoose.Promise = global.Promise
module.exports = mongoose.connect(url, { useNewUrlParser: true })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."