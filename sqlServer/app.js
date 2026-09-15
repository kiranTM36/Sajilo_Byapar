const express = require('express')
require('./db')
const cors = require('cors')

const userModule = require('./modules/userModule')
const productModule = require('./modules/productModule')
const categoryModule = require('./modules/categoryModule')
const creditModule = require('./modules/creditModule')
const salesModule = require('./modules/salesModule')
const salesDetailsModule = require('./modules/salesDetailsModule')
const inventoryModule = require('./modules/inventoryModule')

userModule()
categoryModule()
productModule()
salesModule()
salesDetailsModule()
creditModule()
inventoryModule()

const userRoute = require('./router/userRoute')
const categoryRoute = require('./router/categoryRoute')

const app = express()

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cors({
    origin : "*"
}))

app.use('/user' , userRoute)
app.use('/category' , categoryRoute)


app.listen(8000, () => {
    console.log("Server Started")
})