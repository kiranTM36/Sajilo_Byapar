const router = require('express').Router();

const { createUser , getAllUser , getSingleUser , deleteUser , getAllCustomer } = require('../controller/userController');

router.post('/add', createUser);

router.get('/all', getAllUser)

router.get('/:id' , getSingleUser)

router.delete('/:id' , deleteUser)

router.get('/all/customer' , getAllCustomer)

module.exports = router;