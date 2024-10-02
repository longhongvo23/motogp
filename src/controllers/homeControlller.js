const { pool } = require('../config/database')
const { getAllRider } = require('../services/CRUDRider')
const { getAllTeam } = require('../services/CRUDTeam')

const getHomepage = (req, res) => {

    return res.render('index.ejs')
}

const getCalendar = (req, res) => {
    return res.render('calendar.ejs')
}
const getResultStanding = (req, res) => {
    return res.render('result-standing')
}
const getRiderTeam = async (req, res) => {
    // Get results from the async function
    let results = await getAllTeam(); // Ensure you await if getAllRider is async

    //Log results after initialization
    console.log(">>> results : ", results);
    return res.render('rider-team')
}
const getTeam = async (req, res) => {
    let results = await getAllTeam();
    return results;
}
const getExample = (req, res) => {
    res.render('sample.ejs')
}
const getRiderDetail = (req, res) => {
    res.render('rider-detail.ejs')
}




module.exports = {
    getHomepage, getCalendar, getExample, getResultStanding, getRiderTeam, getRiderDetail, getTeam
}