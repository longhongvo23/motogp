const riderModels = require('../models/riderModels');

/**
 * Lấy tất cả các tay đua.
 */
exports.getRider = async (req, res) => {
    try {
        const results = await riderModels.getAllRider();
        res.json(results);
    } catch (err) {
        console.error('Lỗi khi lấy tất cả tay đua:', err);
        res.status(500).json({ message: 'Error fetching riders' });
    }
};

/**
 * Lấy thông tin chi tiết của một tay đua dựa trên rider_id.
 */
exports.getRiderDetails = async (req, res) => {
    const riderId = parseInt(req.params.rider_id); // Chuyển đổi thành số
    console.log(`Received riderId: ${riderId}`); // Log riderId nhận được

    try {
        const rider = await riderModels.getRiderById(riderId);

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json(rider);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết tay đua:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

