
const riderManagerModels = require('../models/riderManagerModel');

// Thêm rider mới
exports.createRider = async (req, res) => {
    // Lấy các biến từ req.body theo đúng tên
    const { rider_type, backgroundName, riderImg, riderHashtag, firstname, lastname, country_id, team_id, rider_number } = req.body;

    // In ra các giá trị nhận được để kiểm tra
    console.log('Received rider data:', req.body);

    try {
        // Gọi hàm trong model để thêm rider
        const newRider = await riderManagerModels.createRider({
            rider_type,
            backgroundName,
            riderImg,
            riderHashtag,
            firstname,
            lastname,
            country_id,
            team_id,
            rider_number
        });

        res.status(201).json({ message: 'Rider created successfully', rider: newRider });
    } catch (error) {
        res.status(500).json({ message: 'Error creating rider', error: error.message });
    }
};




// Xóa nhiều team theo ID
exports.deleteRider = async (req, res) => {
    const { ids } = req.body; // Lấy danh sách các ID từ req.body
    console.log('Received team IDs:', ids);
    console.log('aaaaaaaaaaaaaaaa', !Array.isArray(ids));

    try {
        // Kiểm tra xem có ID nào không
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'No team IDs provided' });
        }

        // Gọi hàm trong model để xóa các team
        const deleteResults = await riderManagerModels.deleteTeams(ids); // Gọi hàm xóa trong model

        res.status(200).json({ message: `${deleteResults.affectedRows} teams deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teams', error: error.message });
    }
};

exports.getRiderById = async (req, res) => {
    const { rider_id } = req.params; // Lấy ID từ params
    console.log('Received rider ID:', rider_id);  // Đảm bảo ID rider là chính xác

    try {
        const teamDetails = await riderManagerModels.getTeamById(rider_id);

        if (teamDetails) {
            res.status(200).json({ team: teamDetails });
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving team', error: error.message });
    }
};


// Hàm cập nhật thông tin đội
exports.updateRider = async (req, res) => {
    const { teamId } = req.params; // Lấy teamId từ params
    const teamData = req.body; // Lấy dữ liệu từ body

    console.log('Received team data:', teamData);

    try {
        // Gọi hàm updateTeam từ model
        const updated = await riderManagerModels.updateRider(teamId, teamData);

        if (!updated) {
            return res.status(404).json({ message: 'Không tìm thấy đội để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật đội thành công!' });
    } catch (error) {
        console.error('Lỗi khi cập nhật đội:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật đội.' });
    }
};

exports.getAllRider = async (req, res) => {
    try {
        const riders = await riderManagerModels.getAllRider();
        res.status(200).json({ riders });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving riders', error: error.message });
    }
}