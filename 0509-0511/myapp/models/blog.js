const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const blogSchema = mongoose.Schema

autoIncrement.initialize(mongoose)

const blog = new blogSchema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    no: Number,
}, {timestamps: true})

blog.plugin(autoIncrement.plugin, {
    model: 'model',
    field: 'no',
    startAt: 4,
    increment: 1
})

const blogModel = mongoose.model('blog', blog)
module.exports = blogModel