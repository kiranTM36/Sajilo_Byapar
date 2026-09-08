const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true ,
    },
    markedPrice : {
        type : Number ,
        required : true,
        min : 1
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'category' ,
        required : true
    },
    image : {
        type : String  ,
        required : true
    },
    description : {
        type : String , 
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('product' , productSchema)