const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../app');
const helper = require('../helper/db.helper');
const User = require('../../server/model/user');
supertest(app);

describe('validate when create user', () => {
  helper.resetDB();

  it('can not create user without email', (done) => {
    let user = {
      email: undefined,
    };

    User.create(user, (err) => {
      User.find({}, (err, listUser) => {
        expect(listUser.length).to.eq(0);
        done();
      });
    });
  });

  it('can not create user without apikey', (done) => {
    let user = {
      email: 'Nhat Nguyen',
      password: undefined,
    };

    User.create(user, (err) => {
      User.find({}, (err, listUser) => {
        expect(listUser.length).to.eq(0);
        done();
      });
    });
  });

  it('can create user', (done) => {
    let user = {
      email: 'sdsdsdsd',
      password: 'sdsdsdsdsdsdsd',
    };

    User.create(user, (err) => {
      User.find({}, (err, listUser) => {
        expect(listUser.length).to.eq(1);
        done();
      });
    });
  });
});
