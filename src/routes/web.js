const express = require('express')
const { getHomepage, getCalendar, getResultStanding, getRiderTeam, getRiderDetail } = require('../controllers/homeControlller')
const apiRoutes = require('./api');
const teamController = require('../controllers/teamController')
const riderController = require('../controllers/riderController')
const calendarController = require('../controllers/callendarController')
const standingController = require('../controllers/standingController')
const resultController = require('../controllers/resultController')
const router = express.Router()

//HOME PAGE
router.get('/', getHomepage)


//EXAMPLE

router.get('/calendar', getCalendar)
router.get('/result-standing', getResultStanding)
router.get('/api/calendar', calendarController.getMotoGPCalendar)
router.get('/api/teams', teamController.getTeam)
router.get('/api/riders', riderController.getRider)
router.get('/api/riders/:rider_id', riderController.getRiderDetails)
router.get('/api/teams/:team_id', teamController.getTeamDetails)
router.get('/api/standings/riders', standingController.getRiderStandings);
router.get('/api/standings/teams', standingController.getTeamStandings);

router.get('/api/result/event', resultController.getEventNames);
router.get('/api/result/categori', resultController.getCategories);
router.get('/api/result/session', resultController.getSessions);
//router.get('/rider-team', getRiderTeam)
//router.get('/rider-detail', getRiderDetail)

module.exports = router