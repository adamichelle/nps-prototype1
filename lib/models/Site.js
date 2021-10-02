const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    contactEmail:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    contactPerson: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Site', siteSchema);