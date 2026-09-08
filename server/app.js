const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()

//Import Models

//Import Routes
const adminRoute = require('./routes/adminRoute') 
const categoryRoute = require('./routes/categoryRoute')

app.use(cors({
    origin  : "*",
    credentials : true , 
    methods : ["GET", "POST" , "PUT" , "DELETE"]
}))

app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.use('/admin', adminRoute)
app.use('/category' , categoryRoute)

app.listen(9000 , () => {
    console.log("App started")
})