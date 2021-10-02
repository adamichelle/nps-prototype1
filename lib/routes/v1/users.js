var express = require('express');
const UserController = require('../../controllers/UserController');


const userRouter = express.Router();

userRouter.post('/', UserController.signup);

module.exports = userRouter;
