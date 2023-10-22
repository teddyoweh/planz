const EventModel = require('../models/events.model'); 

 

const EventController = {
  
  create: async (req, res) => {
    try {
      
      const { tag, title, description, location, startDate, endDate, access } = req.body;

      
      const newEvent = new EventModel({
        tag,
        title,
        description,
        location,
        startDate,
        endDate,
        access,
      });

      
      const savedEvent = await newEvent.save();

      
      res.status(201).json(savedEvent);
    } catch (error) {
      
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'An error occurred while creating the event' });
    }
  },

  
  get: async (req, res) => {
    try {
      
      const events = await EventModel.find();

      
      res.status(200).json(events);
    } catch (error) {
      
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'An error occurred while fetching events' });
    }
  },

  
  getById: async (req, res) => {
    try {
      const eventId = req.params.id;

      
      const event = await EventModel.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      
      res.status(200).json(event);
    } catch (error) {
      
      console.error('Error fetching event by ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching the event' });
    }
  },

  
  updateById: async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedEventData = req.body;

      
      const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updatedEventData, { new: true });

      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }

      
      res.status(200).json(updatedEvent);
    } catch (error) {
      
      console.error('Error updating event by ID:', error);
      res.status(500).json({ error: 'An error occurred while updating the event' });
    }
  },

  
  deleteById: async (req, res) => {
    try {
      const eventId = req.params.id;

      
      const deletedEvent = await EventModel.findByIdAndDelete(eventId);

      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }

      
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      
      console.error('Error deleting event by ID:', error);
      res.status(500).json({ error: 'An error occurred while deleting the event' });
    }
  },
};

module.exports = EventController;
