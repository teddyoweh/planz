const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
 
 
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ['Public', 'Private', 'Request', 'Friends'],
    default: 'Private',
  },
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
