const express = require('express');
const streamController = require('./controller/stream');
const authenticationController = require('./controller/authentication');
const uploadController = require('./controller/upload');
const hostMiddleware = require('./middleware/host_middleware');
const passportMiddleware = require('./middleware/passport_middleware');
const secretKeyMiddleware = require('./middleware/secretkey_middleware');
const systemController = require('./controller/system');

module.exports = (app) => {
  let streamRoute = express.Router();
  let authRoutes = express.Router();
  let apiKeyRoutes = express.Router();
  let uploadRouter = express.Router();
  let videoRouter = express.Router();
  let systemRouter = express.Router();
  // Auth API
  authRoutes.post('/register', authenticationController.register);
  authRoutes.post('/login', passportMiddleware.requireLogin, authenticationController.login);

  // Generate ApiKey for Intergrating server
  apiKeyRoutes.post('/newApiKey', secretKeyMiddleware.checkSecretKey, authenticationController.generateAPI);
  // Stream API
  streamRoute.get('/getdata', hostMiddleware.CheckHostConnected, streamController.getData);

  // Upload API
  uploadRouter.post('/upload', passportMiddleware.apiKeyAuthorization(['superuser']), uploadController.upload, uploadController.afterUploaded);

  // System API
  systemRouter.post('/webhook', systemController.autoDeploy);
  // Set up route
  app.use('/api/auth', authRoutes);
  app.use('/api/stream', streamRoute);
  app.use('/api', [apiKeyRoutes, uploadRouter, videoRouter, systemRouter]);
};
