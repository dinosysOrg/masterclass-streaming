const express = require('express');
const streamController = require('./controller/stream');
const middleware = require('./middleware');

module.exports = (app) => {
  let streamRoute = express.Router();

  // Steam API
  streamRoute.get('/getdata', middleware.hostMiddleware, streamController.getData);

  // Set up route
  app.use('/api/stream', streamRoute);
};
