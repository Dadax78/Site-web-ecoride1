const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driver: String,
  departure: String,
  destination: String,
  date: Date,
  seatsAvailable: Number
});

module.exports = mongoose.model('Trip', tripSchema);
