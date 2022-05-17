const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    job: {
        type: String,
        required: true,
    }
})

const userData = mongoose.model('users', user)
module.exports = userData