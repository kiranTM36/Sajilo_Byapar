const { addCustomer , getCustomer, customerLogin , getSingleCustomer , deleteCustomer , editCustomer } = require('../controller/customerController')
const router = require('express').Router()

router.get('/add' , addCustomer )

router.get('/all' , getCustomer )

router.get('/:id' , getSingleCustomer )

router.delete('/delete/:id' , deleteCustomer)

router.put('/edit/:id' , editCustomer )

router.post('/login' , customerLogin)

module.exports = router