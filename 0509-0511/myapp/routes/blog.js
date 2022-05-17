const express = require('express')
const blogSchema = require('../models/blog')
const router = express.Router()

router.get('/', async (req, res) => {
    const result = await blogSchema.find({}).exec()
    res.render('blog/blog', { content: result })
})

router.get('/write', (req, res) => {
    res.render('blog/write')
})

router.post('/write', (req, res, next) => {
    const title = req.body.title
    const content = req.body.content

    const blogText = new blogSchema({
        title: title,
        content: content
    })

    blogText.save().then(result => {
        console.log(result)
        res.redirect('/blog')
    }).catch(err => {
        console.error(err)
        next(err)
    })
})

module.exports = router