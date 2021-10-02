const SchoolSession = require('../models/SchoolSession')

class SchoolSessionRepo {
    /**
     * Creates a new schoolSession in the db in the schoolSession collection
     * @param {Object} schoolSessionData The data to be submitted to the db
    */
     static async createSchoolSession(schoolSessionData) {
        try {
            const newSchoolSession = await SchoolSession.create(schoolSessionData);
            return { success: true, data: [newSchoolSession], message: "School Session saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getSchoolSession(id) {
        try {
            const schoolSession = await SchoolSession.findById(id);

            if(!schoolSession) return { success: false, data: null, message: "School Session does not exist" }

            return { success: true, data: schoolSession, message: "SchoolSession found" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getSchoolSessions() {
        try {
            const schoolSessions = await SchoolSession.find({});
            return { success: true, data: schoolSessions, message: "School Sessions retrieved" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = SchoolSessionRepo;