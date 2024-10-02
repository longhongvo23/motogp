const express = require('express');
const router = express.Router();
const { pool } = require('../config/database'); // Đường dẫn đến file database.js của bạn

// API để lấy danh sách rider
router.get('/rider-team', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM teams'); // Thay đổi tên bảng nếu cần
        res.json(rows); // Gửi dữ liệu về client
    } catch (error) {
        console.error('Error fetching riders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
