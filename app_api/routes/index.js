// app_api/routes/index.js
const express = require('express');
const router = express.Router();

// health check to prove the API app is mounted
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', app: 'app_api'});
});

// mount trips under /api/trips
router.use('/trips', require('./trips'));

module.exports = router;