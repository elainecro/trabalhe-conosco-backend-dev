const User = require('./user')
const Relevancia1 = require('./relevancia1')
const Relevancia2 = require('./relevancia2')
const _ = require('lodash')

//User.methods(['get', 'post', 'put', 'delete'])

User.methods(['get']) //para este teste só preciso da rota get

//User.updateOptions({new: true, runValidators: true}) //faz que ao chamar o verbo put, o retorno já seja o objeto atualizado
//runValidators = true faz com que as validações criadas sejam aplicadas no update também

//User.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext) //definindo funções para serem chamadas após execução do post e put

/*function sendErrorsOrNext(req, res, next){
    //bundle é tudo que vem de retorno da requisição
    const bundle = res.locals.bundle

    if (bundle.errors){
        var errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    } else {
        next()
    }
}

function parseErrors(nodeRestfulErrors){
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}*/

User.route('get', function(req, res) {
    var termo = req.params.name

    User.find({
        name: /^.*Jarbas To.*$/i
    }, function (err, listUsers) {
        if (err) res.send(err)

        listUsers.map(function(listUsers) {
            console.log(listUsers.guid)
            var relevanciaMax = Relevancia1.find({guid: listUsers.guid}).count();     
            var relevanciaMin = Relevancia2.find({guid: listUsers.guid}).count();
    
            if (relevanciaMax > 0) {
                listUsers.relevancia = 1;
            } else if (relevanciaMin > 0){
                listUsers.relevancia = 2;
            } else {
                listUsers.relevancia = 3;
            }
            //return userlist;            
        })//.paginate({page: 1, limit: 15}).exec()

        res.json(listUsers)        
    })

    //res.json(cursorUsers)

      //.on('data', function(userlist) { res.json({userlist}) })

    /*User.find({ name: /^.*castro.*$/i }).stream().on('data', function(userlist){
        var relevanciaMax = Relevancia1.find({guid: userlist.guid}).count();     
        var relevanciaMin = Relevancia2.find({guid: userlist.guid}).count();

        if (relevanciaMax > 0) {
            userlist.relevancia = 1;
        } else if (relevanciaMin > 0){
            userlist.relevancia = 2;
        } else {
            userlist.relevancia = 3;
        }

        return userlist;
    }).sort({ relevancia: 1, name: 1}).limit(15)*/
})

User.route('count', function(req, res){
    User.count(function(error, value){
        if (error){
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = User