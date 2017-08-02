const constant = require('../config/constant');
const error = require('../config/error');
exports.CheckHostConnected = (req, res, next) => {
  let refererLink = req.headers.referer;
  if (constant.white_host.indexOf(refererLink) > -1) {
    return next();
  } else {
    return error(405, 'You can not do this operation', next);
  }
};
