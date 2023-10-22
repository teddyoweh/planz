const mongoose = require('mongoose');

const iternarySchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
 
  description: {
    type: String,
    required: true,
  },
  timeisNa:{},
  location: String,
  latitude: {

  },
  longitude: {

  },
  date: {
 
 
  },
  event_id:{},
  time: String,
});

const Event = mongoose.model('Event', iternarySchema);

module.exports = Event;
