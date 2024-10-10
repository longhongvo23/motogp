const { pool } = require('../config/database');

/**
 * Lấy tất cả các tay đua.
 */
const getAllRider = async () => {
    try {
        const [results] = await pool.query(`
            SELECT 
                r.rider_id,
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

const getRiderById = async (riderId) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                r.rider_id,
                r.backgroundName,
                r.riderImg,
                r.riderHashtag,
                r.firstname AS firstName,
                r.lastname AS lastName,
                c.flagImg,
                c.countryName,
                t.team_id,
                t.teamName,
                t.team_type,
                rs.currentPos,
                rs.currentPoint,
                rs.currentVic,
                rs.totalWorldCham,
                rs.totalVic,
                rs.totalPod,
                rs.totalPole,
                rs.totalRace,
                r1.rider_id AS teammateId, 
                r1.firstname AS teammateFirstName,
                r1.lastname AS teammateLastName,
                r1.riderImg AS teammateImg
            FROM 
                riders r
            JOIN 
                countries c ON r.country_id = c.country_id
            JOIN 
                teams t ON r.team_id = t.team_id
            JOIN 
                rider_statistics rs ON r.rider_id = rs.rider_id
            LEFT JOIN 
                riders r1 ON r.team_id = r1.team_id AND r1.rider_id != r.rider_id AND t.team_type = (SELECT team_type FROM teams WHERE team_id = r.team_id) 
            WHERE 
                r.rider_id = ?;
        `, [riderId]);

        if (rows.length === 0) {
            return null;
        }

        const rider = rows[0];

        // Bước 2: Thêm thông tin đồng đội vào đối tượng rider.
        rider.teammateName = `${rider.teammateFirstName} ${rider.teammateLastName}`; // Kết hợp tên và họ của đồng đội.
        rider.teammateId = rider.teammateId; // Lấy teammateId từ kết quả.
        rider.teammateImg = rider.teammateImg || 'path/to/default/image.png'; // Nếu không có hình ảnh, gán hình ảnh mặc định.

        // Bước 3: Trả về thông tin tay đua đã được bổ sung.
        return rider;

    } catch (error) {
        console.error('Lỗi trong getRiderById:', error);
        throw new Error('Database query failed');
    }
};






module.exports = {
    getAllRider,
    getRiderById
};
