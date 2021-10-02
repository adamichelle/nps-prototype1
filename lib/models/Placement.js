const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const placementSchema = new mongoose.Schema({
    siteId: { 
        type: Schema.Types.ObjectId, 
        ref: "site", 
        required: true 
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "student",
        required: true
    },
    schoolSessionId: {
        type: Schema.Types.ObjectId,
        ref: "schoolSession",
        required: true
    },
    setting:{
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true,
    },
    instructorId: {
        type: Schema.Types.ObjectId, 
        ref: "instructor", 
        required: true 
    },
    shift: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Placement', placementSchema);