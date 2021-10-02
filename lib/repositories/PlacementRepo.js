const Placement = require('../models/Placement')

class PlacementRepo {
    /**
     * Creates a new placement in the db in the placement collection
     * @param {Object} placementData The data to be submitted to the db
    */
    static async createPlacement(placementData) {
        try {
            const newPlacement = await Placement.create(placementData);
            return { success: true, data: newPlacement, message: "Placement saved" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getPlacement(id) {
        try {
            const placement = await Placement.findById(id);

            if(!placement) return { success: false, data: null, message: "Placement does not exist" }

            return { success: true, data: placement, message: "Placement found" }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getPlacements() {
        try {
            const placements = await Placement.find({});
            return { success: true, data: placements, message: "Placements retrieved" };
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = PlacementRepo