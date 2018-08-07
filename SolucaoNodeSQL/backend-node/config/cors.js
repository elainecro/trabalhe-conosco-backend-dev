module.exports = function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*') //como é um teste estamos habilitando cors para qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS') //para este teste só preciso do método GET mesmo
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') //habilitando authorization no header
    next()
}