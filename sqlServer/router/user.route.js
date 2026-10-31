const router = require('express').Router();

const { authorize , authenticate} = require('../middleware/authorization')

const { createUser, getAllUser, getSingleUser, deleteUser, getAllCustomer, userLogin, logout, getProfile } = require('../controller/userController');

router.post('/signup' ,  authorize , authenticate('ADMIN'),createUser);

router.get('/profile' , authorize , getProfile)

router.get('/all', getAllUser);

router.get('/all/customer',authorize , authenticate('ADMIN'), getAllCustomer);

router.post('/login', userLogin);

router.get('/:id',authorize , authenticate('ADMIN'), getSingleUser);

router.delete('/:id', authorize , authenticate('ADMIN'), deleteUser);

router.post('/logout' , logout)

module.exports = router;