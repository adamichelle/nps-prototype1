const InstructorService = require("../services/InstructorService");


class InstructorController {
    static async add(req, res) {
        try {
            const instructorServiceRes = await InstructorService.addInstructor(req.body);
            return res.status(201).json({ status: 'success', message: 'Instructor created successfully', data: instructorServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewAll(req, res) {
        try {
            const instructorServiceRes = await InstructorService.viewInstructors();
            return res.status(200).json({ status: 'success', message: instructorServiceRes.message, data: instructorServiceRes.data })

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }

    }

    static async view(req, res) {
        try {
            const instructorServiceRes = await InstructorService.viewInstructor(req.params.id);

            if(!instructorServiceRes.success)
            return res.status(404).json({ status: 'error', message: instructorServiceRes.message, data: null })

            return res.status(200).json({ status: 'success', message: instructorServiceRes.message, data: instructorServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = InstructorController;