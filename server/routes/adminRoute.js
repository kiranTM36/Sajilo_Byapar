const { addAdmin , deleteAdmin , getAdmmin , updateAdmin } = require('../controller/adminController')
const router = require('express').Router()

router.get('/all' , getAdmmin )

router.post('/add/admin' , addAdmin)

router.delete('/delete/:id' , deleteAdmin)

router.put('/edit/:id' , updateAdmin)

module.exports = router