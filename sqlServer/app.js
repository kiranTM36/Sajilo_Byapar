const express = require('express')
require('./db')

const customerModule = require('./modules/customerModules')
const productModule = require('./modules/productModule')
const categoryModule = require('./modules/categoryModule')
const adminModule = require('./modules/adminModule')
const creditModule = require('./modules/creditModule')
const salesModule = require('./modules/salesModule')
const salesDetailsModule = require('./modules/salesDetailsModule')
const inventoryModule = require('./modules/inventoryModule')

customerModule()
productModule()
adminModule()
categoryModule()
creditModule()
salesModule()
salesDetailsModule()
inventoryModule()

const customerRoute = require('./router/customerRoute')

const app = express()

app.use('/customer' , customerRoute)


app.listen(8000, () => {
    console.log("Server Started")
})