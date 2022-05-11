const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    bookname: String,
    author: String,
    price: {
      type: Number,
      default: 5000  
    },
    publish: Date,
    sales: {
        type: Boolean,
        default: false
    }
})

const bookData = mongoose.model('bookinfo', book)
module.exports = bookData