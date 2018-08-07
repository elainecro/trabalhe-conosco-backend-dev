const _ = require('lodash')
const Users = require('../users/userService')

//Mais uma função middleware
function getCounters(req, res){

    var sqlCount = "SELECT COUNT(*) AS total, (SELECT COUNT(*) FROM relevancia1) AS relevancia1, (SELECT COUNT(*) FROM relevancia2) AS relevancia2 FROM users"
    global.conn.request().query(sqlCount).then(result => res.json(result.recordset)).catch(err => res.json(err))    
}

module.exports = { getCounters }