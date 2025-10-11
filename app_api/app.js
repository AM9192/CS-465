// app_api/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connect } = require('../config/db');
const apiRoutes = require('./routes');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Connect to Mongo once when the API app initializes
connect()
    .then(() => console.log('Mongo connected (app_api)'))
    .catch(err => {
        console.error('Mongo connection error (app_api', err);
        process.exit(1);
    });

// Mount rubroutes
app.use('/', apiRoutes);

// 404 for unknown API endpoints
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

module.exports = app;