const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
  const { driver, departure, destination, date, seatsAvailable } = req.body;
  try {
    const trip = await Trip.create({ driver, departure, destination, date, seatsAvailable });
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
