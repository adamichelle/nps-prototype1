const StudentRepo = require('../repositories/StudentRepo');
const UserRepo = require('../repositories/UserRepo');
const { hashPasswordFunction, generateRandomPassword } = require('../utils/general/utilFunctions');

class StudentService {
    static async addStudent(studentInfo) {
        const password = generateRandomPassword(5);

        const hashPassword = await hashPasswordFunction('test'); // for testing/demo purposes

        const studentUserData = {
            firstName: studentInfo.firstName,
            lastName: studentInfo.lastName,
            email: studentInfo.studentEmail,
            password: hashPassword,
            userType: 'student'
        }
        const userRepoRes = await UserRepo.createUser(studentUserData);

        studentInfo.userId = userRepoRes.data._id;
        const studentRepoRes = await StudentRepo.createStudent(studentInfo);
        return { success: true, data: studentRepoRes.data, message: 'Student added successfully' }
    }

    static async viewStudents() {
        try {
            const studentRepoRes = await StudentRepo.getStudents();
            return { success: true, data: studentRepoRes.data, message: 'Students retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async viewStudent(id) {
        try {
            const studentRepoRes = await StudentRepo.getStudent(id);
            if(!studentRepoRes.success)
            return { success: false, data: studentRepoRes.data, message: studentRepoRes.message, isCatchError: false }

            return { success: true, data: studentRepoRes.data, message: 'Student retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = StudentService