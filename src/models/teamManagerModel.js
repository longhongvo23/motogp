const { pool } = require('../config/database'); // Đảm bảo import đúng config

// Hàm để thêm team mới
const createTeam = async (teamData) => {
    console.log('teamDataaaaaaaaaaaaaaaaaaaaaa:', teamData);
    const { backgroundName, team_type, teamName, motoImg, riderName1, riderName2 } = teamData;
    console.log('teamData:', teamData);

    try {
        const query = `
            INSERT INTO teams (backgroundName, team_type, teamName, motoImg, riderName1, riderName2)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Thực hiện câu truy vấn và lấy kết quả
        const [result] = await pool.query(query, [
            backgroundName,
            team_type,
            teamName,
            motoImg,
            riderName1,
            riderName2
        ]);

        // Trả về team mới vừa được thêm
        return {
            team_id: result.insertId,
            ...teamData
        };
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};


// Hàm để xóa nhiều team theo danh sách ID
const deleteTeams = async (ids) => {
    // Chuyển đổi IDs thành chuỗi cho câu truy vấn SQL
    const placeholders = ids.map(() => '?').join(',');
    const query = `DELETE FROM teams WHERE team_id IN (${placeholders})`;

    try {
        // Thực hiện câu truy vấn và lấy kết quả
        const [results] = await pool.query(query, ids);
        return results; // Trả về kết quả
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

// Thêm hàm để lấy thông tin team theo ID
const getTeamById = async (teamId) => {
    const query = 'SELECT * FROM teams WHERE team_id = ?'; // Câu truy vấn để lấy team theo ID
    console.log(query)
    try {
        const [rows] = await pool.query(query, [teamId]);
        // Trả về team nếu có
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

// Hàm để cập nhật thông tin đội
const updateTeam = async (teamId, teamData) => {
    const { backgroundName, team_type, teamName, motoImg, riders } = teamData;
    const riderName1 = riders[0]?.name || null;
    const riderName2 = riders[1]?.name || null;
    console.log(backgroundName, team_type, teamName, motoImg, riderName1, riderName2);

    const query = `
        UPDATE teams 
        SET backgroundName = ?, team_type = ?, teamName = ?, motoImg = ?, riderName1 = ?, riderName2 = ? 
        WHERE team_id = ?
    `;

    try {
        const [result] = await pool.query(query, [
            backgroundName,
            team_type,
            teamName,
            motoImg,
            riderName1,
            riderName2,
            teamId
        ]);

        return result.affectedRows > 0; // Trả về true nếu có dòng được cập nhật
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = {
    createTeam,
    deleteTeams,
    getTeamById,
    updateTeam,
};
