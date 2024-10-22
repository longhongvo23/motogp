const { pool } = require('../config/database'); // Đảm bảo import đúng config

// Hàm để thêm rider mới
const createRider = async (riderData) => {
    const { rider_type, backgroundName, riderImg, riderHashtag, firstname, lastname, country_id, team_id, rider_number } = riderData;

    console.log("riderDataCreate",riderData)

    try {
        const query = `
            INSERT INTO riders (rider_type, backgroundName, riderImg, riderHashtag, firstname, lastname, country_id, team_id, rider_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Thực hiện câu truy vấn và lấy kết quả
        const [result] = await pool.query(query, [
            rider_type,
            backgroundName,
            riderImg,
            riderHashtag,
            firstname,
            lastname,
            country_id,
            team_id,
            rider_number,
        ]);

        // Trả về rider mới vừa được thêm
        return {
            rider_id: result.insertId,
            ...riderData
        };
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};


// Hàm để xóa nhiều team theo danh sách ID
const deleteTeams = async (ids) => {
    console.log('ids:', ids);
    // Chuyển đổi IDs thành chuỗi cho câu truy vấn SQL
    const placeholders = ids.map(id => '?').join(',');
    console.log('placeholders:', placeholders);

    // Xóa các riders có team_id trong danh sách ids
    const deleteRidersQuery = `DELETE FROM riders WHERE rider_id IN (${placeholders})`;
    try {
        await pool.query(deleteRidersQuery, ids);
    } catch (error) {
        console.error(`Failed to delete riders: ${error.message}`);
        throw new Error(`Failed to delete riders: ${error.message}`);
    }
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

const getTeamById = async (riderId) => {
    const query = `
        SELECT riders.*, teams.*, countries.*
        FROM riders
        LEFT JOIN teams ON riders.team_id = teams.team_id
        LEFT JOIN countries ON riders.country_id = countries.country_id
        WHERE riders.rider_id = ?;
    `;

    try {
        const [rows] = await pool.query(query, [riderId]);
        // Trả về thông tin rider cùng với team nếu có
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

// Hàm để cập nhật thông tin đội
const updateRider = async (riderId, riderData) => {
    const { rider_type, backgroundName, riderImg, riderHashtag, firstname, lastname, country_id, team_id, rider_number } = riderData;
    console.log(rider_type, backgroundName, riderImg, riderHashtag, firstname, lastname, country_id, team_id, rider_number);

    const query = `
        UPDATE riders 
        SET rider_type = ?, backgroundName = ?, riderImg = ?, riderHashtag = ?, firstname = ?, lastname = ?, country_id = ?, team_id = ?, rider_number = ? 
        WHERE rider_id = ?
    `;

    try {
        const [result] = await pool.query(query, [
            rider_type,
            backgroundName,
            riderImg,
            riderHashtag,
            firstname,
            lastname,
            country_id,
            team_id,
            rider_number,
            riderId
        ]);

        return result.affectedRows > 0; // Trả về true nếu có dòng được cập nhật
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const getAllRider = async () => {
    const query = `
        SELECT riders.*, teams.*, countries.*
        FROM riders
        LEFT JOIN teams ON riders.team_id = teams.team_id
        LEFT JOIN countries ON riders.country_id = countries.country_id;
    `;

    try {
        const [rows] = await pool.query(query);
        return rows; // Trả về danh sách rider
    } catch (error) {
        console.error(`Database query failed: ${error.message}`);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = {
    createRider,
    deleteTeams,
    getTeamById, 
    updateRider,
    getAllRider,
};
