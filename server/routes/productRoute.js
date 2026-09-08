const { addProduct , getAllProduct , getSingleProduct , deleteProduct , updateProduct }  = require('../controller/productController')
const multer = require('../middleware/multer')
const router = require('express').Router()

router.post('/add/product', multer.single('image') , addProduct)

router.get('/all', getAllProduct)

router.delete('/delete/:id' , deleteProduct)

router.put('/edit/:id' , updateProduct )

router.get('/:id' , getSingleProduct)

module.exports = router