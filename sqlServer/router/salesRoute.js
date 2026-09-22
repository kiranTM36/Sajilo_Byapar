const router = require('express').Router()

const { addSales, getAllSales } = require('../controller/salesController')
const authorize = require('../middleware/authorization')

router.post('/add' , addSales)

router.get('/view', getAllSales)

module.exports = router