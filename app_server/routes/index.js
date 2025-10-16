const express = require('express');
const router = express.Router();

const travelController = require('../controllers/travel');

// list all trips
router.get('/travel', travelController.listTrips);

// view one trip by id
router.get('/travel/:tripid', travelController.tripDetail);

module.exports = router;