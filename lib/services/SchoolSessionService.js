const SchoolSessionRepo = require('../repositories/SchoolSessionRepo');

class SchoolSessionService {
    static async addSchoolSession(schoolSessionInfo) {
        const schoolSessionRepoRes = await SchoolSessionRepo.createSchoolSession(schoolSessionInfo);
        return { success: true, data: schoolSessionRepoRes.data, message: 'SchoolSession added successfully' }
    }

    static async viewSchoolSessions() {
        try {
            const schoolSessionRepoRes = await SchoolSessionRepo.getSchoolSessions();
            return { success: true, data: schoolSessionRepoRes.data, message: 'SchoolSessions retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async viewSchoolSession(id) {
        try {
            const schoolSessionRepoRes = await SchoolSessionRepo.getSchoolSession(id);
            if(!schoolSessionRepoRes.success)
            return { success: false, data: schoolSessionRepoRes.data, message: schoolSessionRepoRes.message, isCatchError: false }

            return { success: true, data: schoolSessionRepoRes.data, message: 'SchoolSession retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = SchoolSessionService