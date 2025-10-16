// app_api/controllers/trips.js
const Trip = require('../models/trip'); // or use the Option B pattern shown above

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().select('code name length start resort perPerson image description').lean();
    return res.status(200).json(trips);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

const tripsCreate = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Validation error', error: e.message || e });
  }
};

const tripsReadOne = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripid).lean();
    if (!trip) return res.status(404).json({ message: 'trip not found' });
    return res.status(200).json(trip);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Bad request', error: e.message || e });
  }
};

const tripsUpdateOne = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripid,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!trip) return res.status(404).json({ message: 'trip not found' });
    return res.status(200).json(trip);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Validation error', error: e.message || e });
  }
};

const tripsDeleteOne = async (req, res) => {
  try {
    const result = await Trip.findByIdAndDelete(req.params.tripid);
    if (!result) return res.status(404).json({ message: 'trip not found' });
    return res.status(204).end(); // 204 should not include a response body
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Bad request', error: e.message || e });
  }
};

module.exports = {
  tripsList,
  tripsCreate,
  tripsReadOne,
  tripsUpdateOne,
  tripsDeleteOne
};