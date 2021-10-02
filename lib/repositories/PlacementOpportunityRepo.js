const PlacementOpportunity = require('../models/PlacementOpportunity');
const { site, schoolSession } = require('../utils/aggregationPipelineStages')

class PlacementOpportunityRepo {
    /**
     * Creates a new placementOpportunity in the db in the placementOpportunity collection
     * @param {Object} placementOpportunityData The data to be submitted to the db
    */
     static async createPlacementOpportunity(placementOpportunityData) {
        try {
            const newPlacementOpportunity = await PlacementOpportunity.create(placementOpportunityData);
            return { success: true, data: newPlacementOpportunity, message: "Placement Opportunity saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getPlacementOpportunity(id) {
        try {
            const placementOpportunity = await PlacementOpportunity.findById(id);

            if(!placementOpportunity) return { success: false, data: null, message: "Placement Opportunity does not exist" }

            return { success: true, data: placementOpportunity, message: "Placement Opportunity found" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getPlacementOpportunities() {
        try {
           const placementOpporunities = await PlacementOpportunity.aggregate([
               site,
               schoolSession
           ]);
           return { success: true, data: placementOpporunities, message: "Placement opportunities retrieved" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async decrementNoPlacementOpportunity(id) {
        try {
            let placementOpportunity = await PlacementOpportunity.findByIdAndUpdate(id, { $inc: { numberOfPlacements: -1 } }, { new: true, useFindAndModify: false })
            
            if(placementOpportunity == null || placementOpportunity.length == 0) return { success: false, data: [], message: "Placement opportunity not found" };

            return { success: true, data: placementOpportunity, message: "Placement opportunity number decremented" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = PlacementOpportunityRepo;