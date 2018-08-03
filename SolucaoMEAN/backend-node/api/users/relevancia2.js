const restful = require('node-restful')
const mongoose = restful.mongoose

const Relevancia2Schema = new mongoose.Schema({
    guid: {type: String }
})
module.exports = restful.model('Relevancia2', Relevancia2Schema)