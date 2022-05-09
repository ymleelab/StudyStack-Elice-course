const express = require('express')
require('dotenv').config()
const app = express()

app.get('', (req, res) => {
    //res.send('<h1>H1 </h1>')
    res.sendFile(__dirname + '/index.html')
})
app.listen(process.env.PORT, () => {
    console.log(`running in ${process.env.PORT}`)
})