const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const instructorSchema = new mongoose.Schema({
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
    instructorEmail:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    specialty: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Instructor', instructorSchema);