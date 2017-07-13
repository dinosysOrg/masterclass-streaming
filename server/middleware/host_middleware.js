const constant = require('../config/constant');

exports.CheckHostConnected = (req, res, next) => {
  let refererLink = req.headers.referer;
  if (constant.white_host.indexOf(refererLink) > -1) {
    next();
  } else {
    let err = new Error('Method is not allowed');
    err.status = 405;
    next(err);
  }
};
