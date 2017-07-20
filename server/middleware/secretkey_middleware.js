const secretKey = require('../config/secret');
const error = require('../config/error');

exports.checkSecretKey = (req, res, next) => {
  let secretKeyHeader = req.body.secretkey;
  if ( secretKeyHeader != secretKey.secretCODE) {
    error(405, 'You can not do this operation', next);
  }

  next();
};
