const PlacementService = require("../services/PlacementService");


class PlacementController {
    static async add(req, res) {
        try {
            const placementServiceRes = await PlacementService.addPlacement(req.body);

            if(!placementServiceRes.success)
            return res.status(400).json({ status: 'error', message: placementServiceRes.message, data: req.body })

            return res.status(201).json({ status: 'success', message: 'Placement created successfully', data: placementServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }

    static async viewAll(req, res) {
        try {
            const placementServiceRes = await PlacementService.viewPlacements();
            return res.status(200).json({ status: 'success', message: placementServiceRes.message, data: placementServiceRes.data })

        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }

    }

    static async view(req, res) {
        try {
            const placementServiceRes = await PlacementService.viewPlacement(req.params.id);

            if(!placementServiceRes.success)
            return res.status(404).json({ status: 'error', message: placementServiceRes.message, data: null })

            return res.status(200).json({ status: 'success', message: placementServiceRes.message, data: placementServiceRes.data })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: "Internal server error", data: error.message });
        }
    }
}

module.exports = PlacementController;