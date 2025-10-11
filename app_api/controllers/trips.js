// app_api/controllers/trips.js
const Trip = require('../models/trip');
const path = require('path');

const list = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).lean();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('GET /trips error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const readOne = async (req, res) => {
  try {
    const { tripCode } = req.params;
    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(trip);
  } catch (err) {
    console.error('GET /trips/:tripCode error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Optional: return an image file for “GET file” testing
const getImage = async (req, res) => {
  try {
    const { tripCode } = req.params;
    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip || !trip.image) return res.status(404).json({ message: 'Image not found' });

    const imgPath = path.join(process.cwd(), 'public', 'images', trip.image);
    return res.status(200).sendFile(imgPath, err => {
      if (err) {
        console.error('sendFile error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (err) {
    console.error('GET /trips/:tripCode/image error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { list, readOne, getImage };