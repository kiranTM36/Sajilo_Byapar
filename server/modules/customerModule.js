const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const customerSchema = new mongoose.Schema({
    customerName : {
        type : String,
        required : true,
        match : [/^[a-zA-Z ]+$/ , "Customer name only contains Letters"] , 
        trim : true
    },
    phoneNo : {
        type : String,
        required : true ,
        match : [/^9(7|8)[0-9]{8}$/ , "Phone number should Start with 98 or 97"] ,
        unique : true
    },  
    password : {
        type : String ,
        required : true ,
    }
},{
    timestamps : true
})

customerSchema.pre('save' , async function () {
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password , 10)
})

module.exports = mongoose.model('customer' , customerSchema)