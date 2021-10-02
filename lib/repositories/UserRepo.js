const Mongoose = require("mongoose");

const User = require('../models/User');

class UserRepo {
    /**
     * Creates a new user in the db in the user collection
     * @param {Object} userData The data to be submitted to the db
     */
    static async createUser(userData) {
        try {
            const newUser = await User.create(userData);
            return { success: true, data: newUser, message: "User saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email })
            if(!user) {
                return { success: false, data: null, message: "There is no user with that email." };
            }

            return { success: true, data: user, message: "User found" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserRepo;
