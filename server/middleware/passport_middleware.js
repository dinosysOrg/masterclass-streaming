const passportConfig = require('../config/passport');
const passport = require('passport');
const error = require('../config/error');
const User = require('../../server/model/user');
const jwt = require('jsonwebtoken');
const secretKey = require('../../server/config/secret');

// Iinitialize passsport Strategies
passportConfig.jwt;
passportConfig.local;

// use passport JWT for validating header per requested
exports.requireAuth = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    if (err) {
      error(500, err, next);
    }

    if (!user) {
      error(401, 'You are not authorized', next);
    }

    req.user = user;
    next();
  })(req, res, next);
};

// use passport local for validating login
exports.requireLogin = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user) => {
    if (err) {
      error(500, err, next);
    }

    if (!user) {
      error(401, 'Please check your username or password', next);
    }

    req.user = user;
    next();
  })(req, res, next);
};

// validate role user
exports.roleAuthorization = (roles) => {
  return (req, res, next) => {
    let user = req.user;
    User.findById(user._id, (err, foundUser) => {
      if (err) {
        error(422, 'No user is found', next);
      }

      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      error(401, 'You are not authorized to view this content');
    });
  };
};

// validate apikey 
exports.apiKeyAuthorization = (roles) => {
  return (req, res, next) => {
    let email = req.body.email;
    let apikey = req.body.apikey;
    User.find({'email': email}, (err, foundUser) => {
      if (err) {
        error(422, 'No user is found', next);
      }

      if (!foundUser) {
        error(405, 'Please generate your apikey', next);
      }

      // If user has role superUser, he/she does not need validate apikey
      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      // Validate apikey that is existed
      if (!foundUser.apikey) {
        error(405, 'You do not have any apikey, Please generae ApiKey', next);
      }

      // Validate apikey in different between apikey requested and apikey queried 
      if (foundUser.apikey != apikey) {
        error(405, 'You do not have any apikey, Please generae ApiKey', next);
      }

      jwt.verify(foundUser.apikey, secretKey.secretAPI, (err, decoded) => {
        if (err) {
          error(422, err.name, next);
        }
      });

      next();
    });
  };
};
