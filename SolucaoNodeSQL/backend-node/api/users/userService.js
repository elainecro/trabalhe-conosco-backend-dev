const User = require('./user')
const _ = require('lodash')

User.methods(['get']) //para este teste só preciso da rota get

User.route('get', function (req, res) {
    var termo = req.query.name
    var skip = req.query.skip
    var limit = req.query.limit


    var sqlQry = "SELECT *, CASE WHEN (SELECT COUNT(*) FROM relevancia1 r1 WHERE r1.guid = u.guid) > 0 THEN 1 WHEN (SELECT COUNT(*) FROM relevancia2 r2 WHERE r2.guid = u.guid) > 0 THEN 2 ELSE 3 END AS relevancia FROM [PicPay].[dbo].[users] u WHERE NAME like '%"+termo+"%' ORDER BY relevancia OFFSET "+skip+ " ROWS FETCH NEXT " +limit+" ROWS ONLY " //FOR JSON PATH
    global.conn.request().query(sqlQry).then(result => res.send({ count:result.recordsets[0].length, data: result.recordset})).catch(err => res.json(err))
})

User.route('count', function (req, res) {
    User.count(function (error, value) {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = User