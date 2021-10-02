var express = require('express');
const SiteController = require('../../controllers/SiteController');


const siteRouter = express.Router();

siteRouter.post('/', SiteController.add)
siteRouter.get('/', SiteController.viewAll)
siteRouter.get('/:id', SiteController.view)

module.exports = siteRouter;
