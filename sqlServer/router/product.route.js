const router = require('express').Router()
const { addProduct, getProduct, getSingleProduct, deleteProduct } = require('../controller/productController')
const multer = require('../middleware/multer')
const auth = require('../middleware/authorization')

router.post('/add' ,multer.single('image'), addProduct)

router.get('/' , getProduct )

router.get('/get/:id' , getSingleProduct)

router.delete('/delete/:id' , deleteProduct)

module.exports = router