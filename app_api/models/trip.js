// app_api/models/trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code:        { type: String, required: true, unique: true }, // e.g. 'GAL01'
  name:        { type: String, required: true },
  length:      { type: Number, required: true },               // days
  start:       { type: Date,   required: true },
  resort:      { type: String, required: true },
  perPerson:   { type: Number, required: true },
  image:       { type: String },                                // optional filename in /public/images
  description: { type: String }
}, { collection: 'trips', timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);