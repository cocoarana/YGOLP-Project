const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const user = require('../models/user.js')

router.get('/', (req, res) =>{
    res.render('index')
})

router.get('/register', (req, res) =>{
    res.render('register', {pageTitle : "Register"})
})

router.get('/login', (req, res) =>{
    res.render('login', {pageTitle : "Log In"})
})

router.post('/register', (req, res) => {
    const {name, lName, email, konamiID, password, password2} = req.body
    var err1, err2, err3, err4, err5, err6 = 0

    console.log(req.body)

    if(password !== password2){
        err5 = "Passwords don't match"
        err6 = err5
        res.render('register',{
            err1,
            err2,
            err3,
            err4,
            err5,
            err6,
            name,
            lName,
            email,
            konamiID,
            password,
            password2,
            pageTitle : "Register"
        })
    } else if(password.length < 7){
        err5 = "Invalid Pass length"
        res.render('register',{
            err1,
            err2,
            err3,
            err4,
            err5,
            err6,
            name,
            lName,
            email,
            konamiID,
            password,
            password2,
            pageTitle : "Register"
        })
    } else if(konamiID.length != 10){
        err4 = "Must be 10 digits"
        res.render('register',{
            err1,
            err2,
            err3,
            err4,
            err5,
            err6,
            name,
            lName,
            email,
            konamiID,
            password,
            password2,
            pageTitle : "Register"
        })
    } else {
        user.findOne({email:email}).then(user1 => {
            if(user1){
                err3 = "Email not available"
                res.render('register',{
                    err1,
                    err2,
                    err3,
                    err4,
                    err5,
                    err6,
                    name,
                    lName,
                    email,
                    konamiID,
                    password,
                    password2,
                    pageTitle : "Register"
                })
            } else{
                user.findOne({konamiID:konamiID}).then(user_ =>{
                    if(user_){
                        err4 = "ID not available"
                        res.render('register',{
                            err1,
                            err2,
                            err3,
                            err4,
                            err5,
                            err6,
                            name,
                            lName,
                            email,
                            konamiID,
                            password,
                            password2,
                            pageTitle : "Register"
                        })
                    } else{
                        const newUser = new user({
                            name,
                            lName,
                            email,
                            konamiID,
                            password
                        })

                        bcrypt.genSalt(10, (err,salt) => {
                            bcrypt.hash(newUser.password, salt, (err,hash) =>{
                                if(err) throw err
                                newUser.password = hash
                                newUser.save().then(userz => {
                                    res.redirect('/login')
                                })
                            })
                        })

                    }
                })
            }
        })
    }

})

module.exports = router