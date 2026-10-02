const {getSingleSalesitem} = require('../controller/salesDetailsController')
const router = require('express').Router()

router.get('/:id' , getSingleSalesitem)

module.exports = router