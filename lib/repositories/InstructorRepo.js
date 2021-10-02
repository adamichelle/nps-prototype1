const Instructor = require('../models/Instructor')

class InstructorRepo {
    /**
     * Creates a new instuctor in the db in the instuctor collection
     * @param {Object} instructorData The data to be submitted to the db
    */
     static async createInstructor(instructorData) {
        try {
            const newInstructor = await Instructor.create(instructorData);
            return { success: true, data: newInstructor, message: "Instructor saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getInstructor(id) {
        try {
            const instuctor = await Instructor.findById(id);

            if(!instuctor) return { success: false, data: null, message: "Instructor does not exist" }

            return { success: true, data: instuctor, message: "Instructor found" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getInstructors() {
        try {
            const instructors = await Instructor.find({});
            return { success: true, data: instructors, message: "Instructor retrieved" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = InstructorRepo;