if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.DATABASE_URL
    ).then(() => console.log('MongoDB Connected')
    ).catch(err => console.log(err))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)