const Student = require('../models/Student')

class StudentRepo {
    /**
     * Creates a new student in the db in the student collection
     * @param {Object} studentData The data to be submitted to the db
    */
    static async createStudent(studentData) {
        try {
            const newStudent = await Student.create(studentData);
            return { success: true, data: newStudent, message: "Student saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getStudent(id) {
        try {
            const student = await Student.findById(id);

            if(!student) return { success: false, data: null, message: "Student does not exist" }

            return { success: true, data: student, message: "Student found" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getStudents() {
        try {
            const students = await Student.find({});
            return { success: true, data: students, message: "Students retrieved" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = StudentRepo