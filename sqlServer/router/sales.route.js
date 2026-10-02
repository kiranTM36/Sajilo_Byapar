const router = require('express').Router()

const { addSales, getAllSales, getSingleSale } = require('../controller/salesController')
const authorize = require('../middleware/authorization')

router.post('/add' , addSales)

router.get('/view', getAllSales)

router.get('/view/:id' , getSingleSale)

module.exports = router