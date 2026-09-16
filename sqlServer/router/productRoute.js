const router = require('express').Router()
const { addProduct } = require('../controller/productController')
const multer = require('../middleware/multer')

router.post('/add' ,multer.single('image'), addProduct)

module.exports = router