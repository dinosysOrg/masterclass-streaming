const User = require('../../server/model/user');

exports.resetDB = () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
};
