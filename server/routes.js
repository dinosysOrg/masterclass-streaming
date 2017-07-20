const express = require('express');
const streamController = require('./controller/stream');
const authenticationController = require('./controller/authentication');
const hostMiddleware = require('./middleware/host_middleware');
const passportMiddleware = require('./middleware/passport_middleware');
const secretKeyMiddleware = require('./middleware/secretkey_middleware');

module.exports = (app) => {
  let streamRoute = express.Router();
  let authRoutes = express.Router();
  let apiKeyRoutes = express.Router();

  // Auth API
  authRoutes.post('/register', authenticationController.register);
  authRoutes.post('/login', passportMiddleware.requireLogin, authenticationController.login);

  // Generate ApiKey for Intergrating server
  apiKeyRoutes.post('/newApiKey', secretKeyMiddleware.checkSecretKey, authenticationController.generateAPI);
  // Steam API
  streamRoute.get('/getdata', hostMiddleware.CheckHostConnected, streamController.getData);

  // Set up route
  app.use('/api/auth', authRoutes);
  app.use('/api/stream', streamRoute);
  app.use('/api', apiKeyRoutes);
};
