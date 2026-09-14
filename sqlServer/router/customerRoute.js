const router = require('express').Router();

const { createUser , getAllCustomer , getSingleCustomer } = require('../controller/customerController');

router.post('/add', createUser);

router.get('/all', getAllCustomer)

router.get('/:id' , getSingleCustomer)

module.exports = router;