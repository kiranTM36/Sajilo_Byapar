const router = require('express').Router()
const { createCategory , getAllCategory } = require('../controller/categoryController')

router.post('/add' , createCategory)

router.get('/all' , getAllCategory)

module.exports = router