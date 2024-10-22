const teamManagerModels = require('../models/teamManagerModel');

// Thêm team mới
exports.createTeam = async (req, res) => {
    // Lấy các biến từ req.body theo đúng tên
    const { backgroundName, image: motoImg, category: team_type, name: teamName, rider1: riderName1, rider2: riderName2 } = req.body;

    // In ra các giá trị nhận được để kiểm tra
    console.log('Received team data:', req.body);
    console.log('team_type:', team_type);
    console.log('teamName:', teamName);
    console.log('motoImg:', motoImg);
    console.log('riderName1:', riderName1);
    console.log('riderName2:', riderName2);

    try {
        // Gọi hàm trong model để thêm team
        const newTeam = await teamManagerModels.createTeam({
            backgroundName,
            team_type,
            teamName,
            motoImg,
            riderName1,
            riderName2
        });

        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error: error.message });
    }
};

// Xóa nhiều team theo ID
exports.deleteTeam = async (req, res) => {
    const { ids } = req.body; // Lấy danh sách các ID từ req.body
    console.log('Received team IDs:', ids);

    try {
        // Kiểm tra xem có ID nào không
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'No team IDs provided' });
        }

        // Gọi hàm trong model để xóa các team
        const deleteResults = await teamManagerModels.deleteTeams(ids); // Gọi hàm xóa trong model

        // Nếu không có team nào bị xóa, trả về thông báo
        if (deleteResults.affectedRows === 0) {
            return res.status(404).json({ message: 'No teams found for the provided IDs' });
        }

        res.status(200).json({ message: `${deleteResults.affectedRows} teams deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teams', error: error.message });
    }
};

// Hàm để lấy thông tin team theo ID
exports.getTeamById = async (req, res) => {
    const { team_id } = req.params; // Lấy ID từ params
    console.log('Received team ID:', team_id);

    try {
        // Gọi hàm trong model để lấy thông tin team
        const teamDetails = await teamManagerModels.getTeamById(team_id);

        // Kiểm tra xem có tìm thấy team không
        if (!teamDetails) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({ team: teamDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving team', error: error.message });
    }
};

// Hàm cập nhật thông tin đội
exports.updateTeam = async (req, res) => {
    const { teamId } = req.params; // Lấy teamId từ params
    const teamData = req.body; // Lấy dữ liệu từ body

    console.log('Received team data:', teamData);

    try {
        // Gọi hàm updateTeam từ model
        const updated = await teamManagerModels.updateTeam(teamId, teamData);

        if (!updated) {
            return res.status(404).json({ message: 'Không tìm thấy đội để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật đội thành công!' });
    } catch (error) {
        console.error('Lỗi khi cập nhật đội:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật đội.' });
    }
};