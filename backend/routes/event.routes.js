const express = require('express');
const EventController = require('../controllers/event.controller');
const EventRouter = express.Router();

EventRouter.post('/create', EventController.create);
EventRouter.get('/get', EventController.get);
EventRouter.get('/:id', EventController.getById); 
EventRouter.put('/:id', EventController.updateById); 
EventRouter.delete('/:id', EventController.deleteById); 

module.exports = EventRouter;
