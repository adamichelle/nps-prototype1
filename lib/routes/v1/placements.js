var express = require('express');
const PlacementController = require('../../controllers/PlacementController');


const placementRouter = express.Router();

placementRouter.post('/', PlacementController.add)
placementRouter.get('/', PlacementController.viewAll)
placementRouter.get('/:id', PlacementController.view)

module.exports = placementRouter;
