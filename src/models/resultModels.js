const { pool } = require('../config/database');

// Hàm lấy danh sách tất cả tên sự kiện
const getAllEventNames = async () => {
    try {
        const query = `SELECT event_id, event_name FROM events;`; // Thêm event_id để có thể sử dụng
        const [results] = await pool.query(query);

        return results.map(event => ({
            id: event.event_id, // Thêm id
            name: event.event_name,
            value: event.event_name.replace(/\s+/g, '-').toLowerCase()
        }));
    } catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
    }
};

// Hàm lấy danh sách tất cả tên thể loại (category)
const getAllCategories = async () => {
    try {
        const query = `SELECT category_id, category_name FROM categories;`; // Thêm category_id
        const [results] = await pool.query(query);

        return results.map(category => ({
            id: category.category_id, // Thêm id
            name: category.category_name,
            value: category.category_name.replace(/\s+/g, '-').toLowerCase()
        }));
    } catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
    }
};

// Hàm lấy danh sách tất cả tên session
const getAllSessions = async () => {
    try {
        const query = `SELECT session_id, session_name FROM sessions;`; // Thêm session_id
        const [results] = await pool.query(query);

        return results.map(session => ({
            id: session.session_id, // Thêm id
            name: session.session_name,
            value: session.session_name.replace(/\s+/g, '-').toLowerCase()
        }));
    } catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const filterResults = async (year, event, category, session) => {
    try {
        const query = `
            SELECT * 
            FROM results 
            WHERE YEAR(date) = ? 
            AND event_name = ? 
            AND category_name = ? 
            AND session_name = ?;
        `;

        const [results] = await pool.query(query, [year, event, category, session]);

        return results;
    } catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = {
    getAllEventNames,
    getAllCategories,
    getAllSessions,
    filterResults
};
