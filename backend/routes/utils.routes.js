
const express = require('express');
const UtilController = require('../controllers/utils.controller');
const UtilRouter = express.Router();

UtilRouter.post('/prompt_search', UtilController.promptImage);
UtilRouter.post('/promptImageWithCLIP', UtilController.promptImageWithCLIP);
 

module.exports = UtilRouter;
