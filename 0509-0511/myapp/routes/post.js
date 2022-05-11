const express = require('express')
const BookSchema = require('../models/book')
const router = express.Router()

router.get('/', (req, res) => {
    //res.send('hello express')
    res.render('post')
})

router.get('/del', (req, res) => {
    res.render('delete')
})

router.get('/bookinfo/:id', (req, res) => {
    const authorname = req.params.id;

    // BookSchema.findOne({auther: authorname}, (err, result) => {
    //     if(result) {
    //         return res.json(result);
    //     } else {
    //         return res.send("등록된 작가가 없습니다")
    //     }
    // })

    BookSchema.find({author: authorname })
        .then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        })
})

router.delete('/del/:id', (req, res) => {
    const bookname = req.params.id;

    BookSchema.findOneAndDelete({bookname:bookname})
        .then(result => {
            res.json({redirect: '/expost'})
        }).catch(err => {
            console.log(err)
        })
})

router.post('/', (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const date = req.body.date;
    //res.json({ name: name, phone: phone, date: date });
    next();
})

router.post('/addbook', (req, res) => {
    const bookname = req.body.bookname;
    const author = req.body.author;
    const price = req.body.price;
    const date = req.body.date;
    
    let bookData = new BookSchema({ 
        bookname: bookname, author: author, price: price, publish : date
    })
    bookData.save();
    res.redirect('/expost')
})

router.post('/', (req, res) => {
    res.redirect('/expost')
})

module.exports = router