const mongoose = require('mongoose');

const schoolSessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        required: true
    },
    isCurrent: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('SchoolSession', schoolSessionSchema);