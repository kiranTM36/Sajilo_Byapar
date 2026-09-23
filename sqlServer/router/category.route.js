const router = require('express').Router()
const { createCategory , getAllCategory, deleteCategory } = require('../controller/categoryController')
const auth = require('../middleware/authorization')

router.post('/add' ,auth('ADMIN'), createCategory)

router.delete('/delete/:id' ,auth("ADMIN") , deleteCategory)

router.get('/all' , getAllCategory)

module.exports = router