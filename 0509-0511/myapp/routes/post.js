const express = require('express')
const BookSchema = require('../models/book')
const bookController = require('../controller/post')
const router = express.Router()

router.get('/', (req, res) => {
    //res.send('hello express')
    res.render('post')
})

router.get('/del', (req, res) => {
    res.render('delete')
})

router.get('/bookinfo/:id', bookController.getbookinfo);

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


router.post('/addbook', bookController.addbook);

router.post('/', (req, res) => {
    res.redirect('/expost')
})

router.get('/getlist', async (req, res) => {
    const result = await BookSchema.find({}).exec();
    return res.status(200).json(result);
})

router.get('/users', (req, res) => {
    res.render('user');
})

router.post('/users', async (req, res, next) => {
    try {
        const userid = req.body.userid;
        const job = req.body.job;
        const user = new userSchema({
            userid: userid,
            job: job
        });
        const result = await user.save();
        res.status(200).json({
            result,
            message: 'user saved'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router