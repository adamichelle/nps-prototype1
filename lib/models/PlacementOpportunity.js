const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const placementOpportunitySchema = new mongoose.Schema({
    siteId: { 
        type: Schema.Types.ObjectId, 
        ref: "site", 
        required: true 
    },
    setting: {
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true,
    },
    schoolSessionId: {
        type: Schema.Types.ObjectId, 
        ref: "schoolSession", 
        required: true 
    },
    numberOfPlacements: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('PlacementOpportunity', placementOpportunitySchema);