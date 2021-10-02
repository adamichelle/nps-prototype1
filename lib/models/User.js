const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    userType: {
        type: String,
        required: true,
        enum: ['admin', 'instructor', 'student']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);