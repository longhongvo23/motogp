const express = require('express')
const { getHomepage, getCalendar, getResultStanding, getRiderTeam, getRiderDetail } = require('../controllers/homeControlller')
const apiRoutes = require('./api');
const teamController = require('../controllers/teamController')
const riderController = require('../controllers/riderController')
const calendarController = require('../controllers/callendarController')
const router = express.Router()

//HOME PAGE
router.get('/', getHomepage)


//EXAMPLE

router.get('/calendar', getCalendar)
router.get('/result-standing', getResultStanding)
router.get('/api/calendar', calendarController.getMotoGPCalendar)
router.get('/api/teams', teamController.getTeam)
router.get('/api/riders', riderController.getRider)

//router.get('/rider-team', getRiderTeam)
//router.get('/rider-detail', getRiderDetail)


module.exports = router