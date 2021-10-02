const InstructorRepo = require('../repositories/InstructorRepo');
const UserRepo = require('../repositories/UserRepo');
const { hashPasswordFunction, generateRandomPassword } = require('../utils/general/utilFunctions');

class InstructorService {
    static async addInstructor(instructorInfo) {
        const password = generateRandomPassword(5);

        const hashPassword = await hashPasswordFunction('test1'); // for testing/demo purposes

        const instructorUserData = {
            firstName: instructorInfo.firstName,
            lastName: instructorInfo.lastName,
            email: instructorInfo.instructorEmail,
            password: hashPassword,
            userType: 'instructor'
        }
        const userRepoRes = await UserRepo.createUser(instructorUserData);

        instructorInfo.userId = userRepoRes.data._id;
        const instructorRepoRes = await InstructorRepo.createInstructor(instructorInfo);
        return { success: true, data: instructorRepoRes.data, message: 'Instructor added successfully' }
    }

    static async viewInstructors() {
        try {
            const instructorRepoRes = await InstructorRepo.getInstructors();
            return { success: true, data: instructorRepoRes.data, message: 'Instructors retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async viewInstructor(id) {
        try {
            const instructorRepoRes = await InstructorRepo.getInstructor(id);
            if(!instructorRepoRes.success)
            return { success: false, data: instructorRepoRes.data, message: instructorRepoRes.message, isCatchError: false }

            return { success: true, data: instructorRepoRes.data, message: 'Instructor retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = InstructorService