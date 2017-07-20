const passport = require('passport');
const User = require('../../server/model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secretKey = require('../../server/config/secret');
const LocalStrategy = require('passport-local').Strategy;

const localOptions = {
  usernameField: 'email',
};

let localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({
    email: email,
  }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: secretKey.secretAPI,
};

let jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
});

module.exports = {
  'local': passport.use(localLogin),
  'jwt': passport.use(jwtLogin),
};
