const express = require('express')
const auth = require('./auth')

module.exports = function (server) {
    
    /* Rotas abertas */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/login/loginService')
    openApi.post('/signin', AuthService.signin)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /* Rotas protegidas por Token JWT */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    //protectedApi.use(auth)

    const userService = require('../api/users/userService')
    userService.register(protectedApi, '/users')

    const countersService = require('../api/counters/countersService')
    protectedApi.route('/counters').get(countersService.getCounters)
}