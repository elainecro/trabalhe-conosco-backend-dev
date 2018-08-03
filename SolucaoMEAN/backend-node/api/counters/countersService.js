const _ = require('lodash')
const Users = require('../users/userService')
const Relevancia1 = require('../users/relevancia1')
const Relevancia2 = require('../users/relevancia2')

//Mais uma função middleware
function getCounters(req, res){


    Users.aggregate([{
        $group: { _id: null, total: { $sum: 1 } }
    },{
        $project: {_id: 1, total: 1}
    }], function(err, respUsers) {
        if (err) return res.status(500).json({ errors: [err]})

        Relevancia1.aggregate([{
            $group: { _id: null, totRelevancia1: { $sum: 1 }}
        }, {
            $project: {_id: 1, totRelevancia1: 1 }
        }], function(err, respRelevancia1){
            if (err) return res.status(500).json({ errors: [err]})
            respUsers[0]["relevancia1"] =  respRelevancia1[0].totRelevancia1

            Relevancia2.aggregate([{
                $group: { _id: null, totRelevancia2: { $sum: 1 }}
            }, {
                $project: {_id: 1, totRelevancia2: 1 }
            }], function (err, respRelevancia2) {
                if (err) return res.status(500).json({ errors: [err]})
                respUsers[0]["relevancia2"] = respRelevancia2[0].totRelevancia2

                res.json(respUsers[0])
            })            
        })
    })
    
}

module.exports = { getCounters }