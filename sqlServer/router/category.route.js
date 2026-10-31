const router = require('express').Router()
const { createCategory , getAllCategory, deleteCategory } = require('../controller/categoryController')
const { authorize, authenticate } = require('../middleware/authorization')

router.post('/add', authorize , authenticate('ADMIN') , createCategory)

router.delete('/delete/:id' ,authorize , authenticate('ADMIN') , deleteCategory)

router.get('/all' , getAllCategory)

module.exports = router