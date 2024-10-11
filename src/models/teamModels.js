const { pool } = require('../config/database')

const getAllTeam = async () => {
    try {
        const [results] = await pool.query(`SELECT * FROM teams`);
        return results; // Trả về kết quả sau khi query thành công
    } catch (error) {
        throw new Error('Database query failed'); // Bắt lỗi nếu query thất bại
    }
};

const getTeamByID = async (teamId) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                t.team_id,
                t.teamName,
                t.team_type,
                t.backgroundName,
                t.motoImg,
                r.rider_id,
                r.firstname,
                r.lastname,
                r.riderImg,
                r.riderHashtag
            FROM 
                teams t
            LEFT JOIN 
                riders r ON r.team_id = t.team_id
            WHERE 
                t.team_id = ?;
        `, [teamId]);

        if (rows.length === 0) {
            return null;
        }

        // Bước 2: Tạo đối tượng cho thông tin đội và tay đua
        const team = {
            teamId: rows[0].team_id,
            teamName: rows[0].teamName,
            teamType: rows[0].team_type,
            backgroundName: rows[0].backgroundName,
            motoImg: rows[0].motoImg || 'path/to/default/image.png',
            riders: rows.map(row => ({
                riderId: row.rider_id,
                name: `${row.firstname} ${row.lastname}`,
                img: row.riderImg || 'path/to/default/image.png',
                hashtag: row.riderHashtag
            }))
        };

        // Bước 3: Trả về thông tin đội
        return team;

    } catch (error) {
        console.error('Lỗi trong getTeamByID:', error);
        throw new Error('Database query failed');
    }
};




module.exports = {
    getAllTeam, getTeamByID
}