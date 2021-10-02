const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ['Year 1', 'Year 2', 'Year 3', 'Year 4']
    },
    studentEmail:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    preferredLocation: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Student', studentSchema);