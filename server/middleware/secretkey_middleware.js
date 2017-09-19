const secretKey = require('../config/secret');
const error = require('../config/error');

exports.checkSecretKey = (req, res, next) => {
  let secretKeyHeader = req.get('secretkey');
  if ( secretKeyHeader != secretKey.secretCODE) {
    return error(405, 'You can not do this operation', next);
  }

  return next();
};
