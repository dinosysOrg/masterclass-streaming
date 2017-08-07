const jwt = require('jsonwebtoken');
const User = require('../../server/model/user');
const secretKey = require('../../server/config/secret');
const error = require('../config/error');

let generateToken = (user) => {
  return jwt.sign(user, secretKey.secretAPI, {
    expiresIn: '7d',
  });
};

let setUserInfo = (request) => {
  return {
    _id: request._id,
    email: request.email,
    role: request.role,
  };
};

exports.login = (req, res) => {
  const userInfo = setUserInfo(req.user);
  res.header('Access-Token', 'JWT ' + generateToken(userInfo));
  res.status(200).json({
    user: userInfo,
  });
};

exports.register = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;

  if (!email) {
    return error(422, 'You must enter an email address', next);
  }

  if (!password) {
    return error(422, 'You must enter an password', next);
  }

  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return error(500, err, next);
    }

    if (existingUser) {
      return error(422, 'Email address is already in use', next);
    }

    let user = new User({
      email: email,
      password: password,
      role: role,
    });

    user.save((err, user) => {
      if (err) {
        return error(500, err, next);
      }

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo,
      });
    });
  });
};

exports.generateAPI = (req, res, next) => {
  let email = req.body.email;
  let generateAPI = generateToken({email: email});
  let user = new User({
    email: email,
    password: generateAPI,
    apikey: generateAPI,
  });

  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return error(500, err, next);
    }

    if (!existingUser) {
      user.save((err, user) => {
        if (err) {
          return error(500, err, next);
        }

        res.status(201).json({
          apikey: user.apikey,
        });
      });
    }

    if (existingUser && existingUser.apikey) {
      jwt.verify(existingUser.apikey, secretKey.secretAPI, (err, decoded) => {
        if (err) {
          existingUser.apikey = generateAPI;
          existingUser.save((err, existingUserSaved) => {
            if (err) {
              return error(500, err, next);
            }

            res.status(201).json({
              apikey: existingUserSaved.apikey,
            });
          });
        }

        return error(405, 'You already had apikey, please use this', next);
      });
    }

    if (existingUser && !existingUser.apikey) {
      existingUser.apikey = generateAPI;
      existingUser.save((err, existingUserSaved) => {
        if (err) {
          return error(500, err, next);
        }

        res.status(201).json({
          apikey: existingUserSaved.apikey,
        });
      });
    }
  });
};
