const riderModels = require('../models/riderModels');

exports.getRider = async (req, res) => {
    try {
        const results = await riderModels.getAllRider(); // Đợi kết quả từ teamModels
        res.json(results); // Trả về kết quả khi truy vấn thành công
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teams' }); // Xử lý lỗi khi xảy ra
    }
};
