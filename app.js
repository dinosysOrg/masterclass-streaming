const express = require('express');
const app = express();
const logger = require('./lib/logger');
const router = require('./server/routes');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const exceptionHandler = require('./server/utilities/exceptionHandler');

app.use(express.static(__dirname));

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
