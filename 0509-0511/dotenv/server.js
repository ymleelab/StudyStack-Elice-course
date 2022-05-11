require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./router/userRouter')
const User = require("./models/users");
const app = express()
const { MONGO_URI, PORT } = process.env

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/user", userRouter)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('', (req, res) => {
    //res.send('<h1>H1 </h1>')
    //res.sendFile(__dirname + '/index.html')
    User.find({}, (err, users) => {
        if (err) {
          console.log(err);
        } else {
          res.render("index", { users });
        }
    });
})
app.listen(PORT, () => {
    console.log(`running in ${PORT}`)
})