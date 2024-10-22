const express = require('express')
const { getHomepage, getCalendar, getResultStanding, getRiderTeam, getRiderDetail } = require('../controllers/homeControlller')
const apiRoutes = require('./api');
const teamController = require('../controllers/teamController')
const riderController = require('../controllers/riderController')
const calendarController = require('../controllers/callendarController')
const standingController = require('../controllers/standingController')
const resultController = require('../controllers/resultController')
const teamManagerController = require('../controllers/teamManagerController');
const riderManagerController = require('../controllers/riderManagerController');
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

// Lấy danh sách tất cả tên sự kiện
router.get('/api/result/event', resultController.getEventNames);

// Lấy danh sách tất cả tên thể loại
router.get('/api/result/category', resultController.getCategories);

// Lấy danh sách tất cả tên session
router.get('/api/result/session', resultController.getSessions);

// Lọc kết quả theo năm, sự kiện, thể loại và session (sử dụng GET)
router.post('/api/result/filter', resultController.filterResults);

// TeamManager

router.post('/api/createTeamManager', teamManagerController.createTeam);

router.post('/api/deleteTeamManager', teamManagerController.deleteTeam);

router.get('/api/teammanage/:team_id', teamManagerController.getTeamById);

router.put('/api/teammanageupdate/:teamId', teamManagerController.updateTeam);

// Rider Manager

router.get('/api/getAllRiders', riderManagerController.getAllRider)

router.post('/api/createRiderManager', riderManagerController.createRider);

router.post('/api/deleteRiderManager', riderManagerController.deleteRider);

router.get('/api/rider/:rider_id', riderManagerController.getRiderById);

router.put('/api/rider/:teamId', riderManagerController.updateRider);

module.exports = router