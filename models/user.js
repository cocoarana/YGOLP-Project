const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },lName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    konamiID:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
 })

 const User = mongoose.model('User', userSchema, "e_users")

 module.exports = User