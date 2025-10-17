// app_api/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connect } = require('../config/db');
const apiRoutes = require('./routes');

// Load environment variables (.env)const path = require('path');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Passport setup
const passport = require('passport');
require('./config/passport'); // local strategy   // :contentReference[oaicite:4]{index=4}

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  console.log('[API hit]', req.method, req.url);
  next();
});

app.use(morgan('dev'));

// CORS — allow Authorization header for Bearer tokens
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization']
  })
);

app.use(express.json());

// Initialize Passport
app.use(passport.initialize()); // 【22†index.pdf†L195-L195*/

// Connect to Mongo once when the API app initializes
connect()
  .then(() => console.log('Mongo connected (app_api)'))
  .catch(err => {
    console.error('Mongo connection error (app_api', err);
    process.exit(1);
  });

// Mount routes
app.use('/', apiRoutes);

// 404 for unknown API endpoints
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

module.exports = app;

