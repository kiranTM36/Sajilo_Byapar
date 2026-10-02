const {getAllCreditor} = require('../controller/creditConrtoller')
const route = require('express').Router()

route.get('/all' , getAllCreditor)

module.exports = route