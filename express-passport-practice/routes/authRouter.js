const router = require('express').Router();
const User = require("../models/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/signup", (req, res) => {
    res.render("signup");
})

router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    User.create({ 
        username, 
        password,
    }), (err, user) => {
        if(err) {
            return res.status(500).json({
                message: "Internal Server Error",
                err
            })
        } else {
            res.status(200)
        }
    }
})

router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        //콜백함수를 쓰면서 쓸 파라미터
        if(err || !user) {
            return res.status(400).json({message: err})
        }
        req.login(user, {session: false}, (err) => {
            if(err) {
                res.json({message: err})
            }
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET)
            return res.json({token})
        })
    })(req, res)
    //라우터의 req, res
})
module.exports = router;