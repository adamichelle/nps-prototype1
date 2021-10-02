const PlacementRepo = require('../repositories/PlacementRepo');
const PlacementOpportunityRepo = require('../repositories/PlacementOpportunityRepo');

class PlacementService {
    static async addPlacement(requestBody) {
        try {
            const placementRepoRes = await PlacementRepo.createPlacement(requestBody.placementInfo);
    
            if(!placementRepoRes.success)
            return { success: false, data: requestBody, message: "Placement not added successfully" }
    
            await PlacementOpportunityRepo.decrementNoPlacementOpportunity(requestBody.placementOpportunityId);
    
            return { success: true, data: placementRepoRes.data, message: 'Placement added successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
            
        }
    }

    static async viewPlacements() {
        try {
            const placementRepoRes = await PlacementRepo.getPlacements();
            return { success: true, data: placementRepoRes.data, message: 'Placements retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }

    static async viewPlacement(id) {
        try {
            const placementRepoRes = await PlacementRepo.getPlacement(id);
            if(!placementRepoRes.success)
            return { success: false, data: placementRepoRes.data, message: placementRepoRes.message, isCatchError: false }

            return { success: true, data: placementRepoRes.data, message: 'Placement retrived successfully' }
        } catch (error) {
            return { success: false, data: null, message: `The following error occurred: ${error.message}.`, isCatchError: true }
        }
    }
}

module.exports = PlacementService