const router = require('express').Router()
const { createInventory, showInventory } = require('../controller/inventoryController')
const auth = require('../middleware/authorization')

router.post('/add' , createInventory)

router.get('/' , showInventory)

module.exports = router