var express = require('express');
const InstructorController = require('../../controllers/InstructorController');


const instructorRouter = express.Router();

instructorRouter.post('/', InstructorController.add);
instructorRouter.get('/', InstructorController.viewAll);
instructorRouter.get('/:id', InstructorController.view);

module.exports = instructorRouter;
