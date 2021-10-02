var express = require('express');
const PlacementOpportunitiesController = require('../../controllers/PlacementOpportunityController');


const placementOpportunitiesRouter = express.Router();

placementOpportunitiesRouter.get('/', PlacementOpportunitiesController.viewAll)
placementOpportunitiesRouter.post('/', PlacementOpportunitiesController.add)

module.exports = placementOpportunitiesRouter;
