const express = require('express')
const { getHomepage, getCalendar, getResultStanding, getRiderTeam, getRiderDetail } = require('../controllers/homeControlller')

const router = express.Router()

//HOME PAGE
router.get('/', getHomepage)


//EXAMPLE

router.get('/calendar', getCalendar)
router.get('/result-standing', getResultStanding)
router.get('/rider-team', getRiderTeam)
router.get('/rider-detail', getRiderDetail)

module.exports = router