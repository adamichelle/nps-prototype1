var express = require('express');
const SchoolSessionController = require('../../controllers/SchoolSessionController');


const schoolSessionRouter = express.Router();

schoolSessionRouter.post('/', SchoolSessionController.add)
schoolSessionRouter.get('/', SchoolSessionController.viewAll)
schoolSessionRouter.get('/:id', SchoolSessionController.view)

module.exports = schoolSessionRouter;
