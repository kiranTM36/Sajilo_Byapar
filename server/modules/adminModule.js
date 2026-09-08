const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    amdinName : {
        type : String,
        required : true,
        match : /^[a-z]{5,}$/
    },
    email : {
        type : String ,
        required : true,
        unique : true,
        match : /^[a-z][a-zA-Z0-9-_.!]+@[a-z]+\.[a-z]{2,}$/
    },
    password : {
        type : String ,
        minLength : [8 , "Password must be more than 8 letters"], 
        required : true
    }
}, {
    timestamps : true
})

adminSchema.pre('save',async function () {
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password , 10)
})

module.exports = mongoose.model('admin' , adminSchema)