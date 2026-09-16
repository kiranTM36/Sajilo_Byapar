const router = require('express').Router();
const auth = require('../middleware/authorization')

const { createUser , getAllUser , getSingleUser , deleteUser , getAllCustomer, userLogin } = require('../controller/userController');

router.post('/add', createUser);

router.get('/all', getAllUser)

router.get('/:id' , getSingleUser)

router.delete('/:id' , auth("ADMIN"), deleteUser)

router.get('/all/customer' , getAllCustomer)

router.post('/login' , userLogin)

module.exports = router;