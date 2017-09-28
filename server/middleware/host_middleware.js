const constant = require('../config/constant');
const error = require('../config/error');
const _ = require('lodash');

exports.CheckHostConnected = (req, res, next) => {
  let refererLink = req.headers.referer;
  if (refererLink) {
    let obj = _.find(constant.white_host, function(value) {
      return refererLink.includes(value);
    });

    if (obj) {
      return next();
    } else {
      return error(405, 'You can not do this operation', next);
    }
  }
  return error(405, 'You can not do this operation', next);
};
