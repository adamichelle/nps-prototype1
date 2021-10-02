const StudentService = require("../services/StudentService");


class StudentController {
    static async add(req, res) {
        try {
            const studentServiceRes = await StudentService.addStudent(req.body);
            return res.status(201).json({ status: 'success', message: 'Student created successfully', data: studentServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewAll(req, res) {
        try {
            const studentServiceRes = await StudentService.viewStudents();
            return res.status(200).json({ status: 'success', message: studentServiceRes.message, data: studentServiceRes.data })

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }

    }

    static async view(req, res) {
        try {
            const studentServiceRes = await StudentService.viewStudent(req.params.id);

            if(!studentServiceRes.success)
            return res.status(404).json({ status: 'error', message: studentServiceRes.message, data: null })

            return res.status(200).json({ status: 'success', message: studentServiceRes.message, data: studentServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = StudentController;