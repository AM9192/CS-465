const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(ctrlTrips.tripsCreate);

router
  .route('/trips/:tripid')
  .get(ctrlTrips.tripsReadOne)
  .put(ctrlTrips.tripsUpdateOne)
  .delete(ctrlTrips.tripsDeleteOne);

module.exports = router;