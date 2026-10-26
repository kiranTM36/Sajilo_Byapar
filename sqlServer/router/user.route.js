const router = require('express').Router();

const auth = require('../middleware/authorization');

const { createUser, getAllUser, getSingleUser, deleteUser, getAllCustomer, userLogin, logout } = require('../controller/userController');

router.post('/signup' ,  auth('ADMIN'),createUser);

router.get('/all', getAllUser);

router.get('/all/customer', getAllCustomer);

router.post('/login', userLogin);

router.get('/:id', getSingleUser);

router.delete('/:id', auth('ADMIN'), deleteUser);

router.post('/logout' , logout)

module.exports = router;