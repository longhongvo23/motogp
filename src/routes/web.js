const express = require('express')
const { getHomepage, getExample } = require('../controllers/homeControlller')

const router = express.Router()

//HOME PAGE
router.get('/', getHomepage)


//EXAMPLE
router.get('/ex', getExample)

module.exports = router