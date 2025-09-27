// app_server/controllers/travel.js
const fs = require('fs');
const path = require('path');

exports.travelList = (req, res) => {
  const dataFile = path.join(__dirname, '..', '..', 'data', 'trips.json');
  const trips = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

  res.render('travel', {
    title: 'Travlr Getaways',
    trips
  });
};