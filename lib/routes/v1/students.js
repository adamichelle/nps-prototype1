var express = require('express');
const StudentController = require('../../controllers/StudentController');


const studentRouter = express.Router();

studentRouter.post('/', StudentController.add);
studentRouter.get('/', StudentController.viewAll);
studentRouter.get('/:id', StudentController.view);

module.exports = studentRouter;
