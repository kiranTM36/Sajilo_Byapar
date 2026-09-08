const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/sajiloByapar')

const db = mongoose.connection

db.on('connected' , ()=> {
    console.log("MongoDB Connected Sucessfully");
})

db.on('error' , (err)=> {
    console.log("MongoDB connection Error "+err);
})

db.on('disconnected' , ()=> {
    console.log("MongoDB disconnected Sucessfully");
})

module.exports = db