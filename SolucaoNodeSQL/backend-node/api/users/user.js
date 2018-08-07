const restful = require('node-restful')
const mongoose = restful.mongoose

const UserSchema = new mongoose.Schema({
    guid: {type: String, required: true },
    name: {type: String, required: true },
    username: {type: String, required: true },
    relevancia: {type: Number, min: 1, max: 3}
})

module.exports = restful.model('Users', UserSchema)