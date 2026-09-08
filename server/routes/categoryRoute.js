const { addCategory , getCategory , deletecategory , updateCategory} = require('../controller/categoryController')
const router = require('express').Router()

router.post('/add/category' , addCategory)

router.get('/get/all' , getCategory)

router.delete('/delete/:id' , deletecategory )

router.put('/update/:id' , updateCategory)

module.exports = router