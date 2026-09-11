const { addAdmin , deleteAdmin , getAdmmin , adminLogin , updateAdmin } = require('../controller/adminController')
const router = require('express').Router()

router.get('/all' , getAdmmin )

router.post('/add/admin' , addAdmin)

router.delete('/delete/:id' , deleteAdmin)

router.put('/edit/:id' , updateAdmin)

router.post('/login', adminLogin)

module.exports = router