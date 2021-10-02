const PlacementOpportunityService = require("../services/PlacementOpportunityService");


class PlacementOpportunityController {
    static async add(req, res) {
        try {
            const placementOpportunityServiceRes = await PlacementOpportunityService.addPlacementOpportunity(req.body);
            return res.status(201).json({ status: 'success', message: 'Placement created successfully', data: placementOpportunityServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewAll(req, res) {
        try {
            const placementOpportunityServiceRes = await PlacementOpportunityService.viewPlacementOpportunities();
            return res.status(200).json({ status: 'success', message: placementOpportunityServiceRes.message, data: placementOpportunityServiceRes.data })

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }

    }

    static async view(req, res) {
        try {
            const placementOpportunityServiceRes = await PlacementOpportunityService.viewPlacementOpportunity(req.params.id);

            if(!placementOpportunityServiceRes.success)
            return res.status(404).json({ status: 'error', message: placementOpportunityServiceRes.message, data: null })

            return res.status(200).json({ status: 'success', message: placementOpportunityServiceRes.message, data: placementOpportunityServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = PlacementOpportunityController;