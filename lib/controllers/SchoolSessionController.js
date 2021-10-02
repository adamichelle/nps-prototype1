const SchoolSessionService = require("../services/SchoolSessionService");


class SchoolSessionController {
    static async add(req, res) {
        try {
            const schoolSessionServiceRes = await SchoolSessionService.addSchoolSession(req.body);
            return res.status(201).json({ status: 'success', message: 'SchoolSession created successfully', data: schoolSessionServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewAll(req, res) {
        try {
            const schoolSessionServiceRes = await SchoolSessionService.viewSchoolSessions();
            return res.status(200).json({ status: 'success', message: schoolSessionServiceRes.message, data: schoolSessionServiceRes.data })

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }

    }

    static async view(req, res) {
        try {
            const schoolSessionServiceRes = await SchoolSessionService.viewSchoolSession(req.params.id);

            if(!schoolSessionServiceRes.success)
            return res.status(404).json({ status: 'error', message: schoolSessionServiceRes.message, data: null })

            return res.status(200).json({ status: 'success', message: schoolSessionServiceRes.message, data: schoolSessionServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = SchoolSessionController;