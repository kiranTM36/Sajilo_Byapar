const express = require('express')
require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

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

const userRoute = require('./router/user.route')
const categoryRoute = require('./router/category.route')
const productRoute = require('./router/product.route')
const salesRoute = require('./router/sales.route')
const inventoryRoute = require('./router/invetory.route')

const app = express()

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use('/uploads', express.static('uploads'))

app.use('/user' , userRoute)
app.use('/category' , categoryRoute)
app.use('/product' , productRoute)
app.use('/sales' , salesRoute)
app.use('/inventory' , inventoryRoute)

app.listen(8000, () => {
    console.log("Server Started")
})