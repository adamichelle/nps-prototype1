var express = require('express');
const UserController = require('../../controllers/UserController');


const sessionRouter = express.Router();

sessionRouter.post('/', UserController.login)

module.exports = sessionRouter;
