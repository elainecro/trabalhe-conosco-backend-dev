const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        //passa batido naquelas requisições do tipo OPTIONS que são enviadas antes de chamar cada ver get, post, put, etc
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'] // procura o token de autenticação no corpo da requisição ou na querystring ou no header (forma utilizada no front)

        if (!token) {
            return res.status(403).send({ errors: ['Nenhum token fornecido.'] }) //se não encontrar o token em lugar nenhum, retorno status 403
        }
        
        jwt.verify(token, env.authSecret, function (err) {
            //verificando token usando função da própria jwt, se falhar retorno status 403 senão sigo normalmente
            if (err) {
                return res.status(403).send({
                    errors: ['Falha para autenticar o token.']
                })
            } else {
                next()
            }
        })
    }
}