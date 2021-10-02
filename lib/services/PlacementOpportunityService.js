const PlacementOpportunityRepo = require('../repositories/PlacementOpportunityRepo');

class PlacementOpportunityService {
    static async addPlacementOpportunity(placementOpportunityInfo) {
        const placementOpRepoRes = await PlacementOpportunityRepo.createPlacementOpportunity(placementOpportunityInfo);
        return { success: true, data: placementOpRepoRes.data, message: 'Placement opportunities added successfully' }
    }

    static async viewPlacementOpportunities() {
        try {
            const placementOpRepoRes = await PlacementOpportunityRepo.getPlacementOpportunities();
            return { success: true, data: placementOpRepoRes.data, message: 'Placement opportunities retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async viewPlacementOpportunity(id) {
        try {
            const placementOpRepoRes = await PlacementOpportunityRepo.getPlacementOpportunity(id);
            if(!placementOpRepoRes.success)
            return { success: false, data: placementOpRepoRes.data, message: placementOpRepoRes.message, isCatchError: false }

            return { success: true, data: placementOpRepoRes.data, message: 'Placement opportunity retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = PlacementOpportunityService