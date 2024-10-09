const { pool } = require('../config/database');

const getAllRider = async () => {
    try {
        const [results] = await pool.query(`
SELECT 
    r.backgroundName, 
    r.riderImg, 
    r.riderHashtag, 
    r.firstname AS firstName, 
    r.lastname AS lastName, 
    c.flagImg, 
    c.countryName, 
    t.teamName, 
    r.rider_type, 
    rs.currentPos, 
    rs.currentPoint, 
    rs.currentVic, 
    rs.totalWorldCham, 
    rs.totalVic, 
    rs.totalPod, 
    rs.totalPole, 
    rs.totalRace
FROM riders r
JOIN countries c ON r.country_id = c.country_id
JOIN teams t ON r.team_id = t.team_id
JOIN rider_statistics rs ON r.rider_id = rs.rider_id;

        `);
        return results;
    } catch (error) {
        console.error('Lỗi trong getAllRider:', error);
        throw new Error('Database query failed');
    }
};

module.exports = {
    getAllRider
};
