const resultModels = require('../models/resultModels'); // Đảm bảo import đúng

exports.getEventNames = async (req, res) => {
    try {
        const events = await resultModels.getAllEventNames();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event names' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await resultModels.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await resultModels.getAllSessions();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sessions' });
    }
};

exports.filterResults = async (req, res) => {
    const { year, event, category, session } = req.body;
    try {
        const results = await resultModels.filterResults(year, event, category, session);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering results' });
    }
};
