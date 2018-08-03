const restful = require('node-restful')
const mongoose = restful.mongoose

const Relevancia1Schema = new mongoose.Schema({
    guid: {type: String }
})
module.exports = restful.model('Relevancia1', Relevancia1Schema)
