const express = require('express');
const app = express();
const logger = require('./lib/logger');
const router = require('./server/routes');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const databaseConfig = require('./server/config/database');
const exceptionHandler = require('./server/utilities/exceptionHandler');

/**
 * Connect DB with URL that is defined in config/database
 * Set promise for mongoose
 */
mongoose.connect(databaseConfig.url, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

app.use(express.static(__dirname));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) logger.error(err);
  logger.info(`Server is running at port :${port}`);
});

if (env == 'development') {
  app.use(morgan('dev'));
}

app.get('/play', (req, res) => {
  res.sendFile(__dirname + '/demo/index.html');
});

router(app);
exceptionHandler(app);

module.exports = app;
