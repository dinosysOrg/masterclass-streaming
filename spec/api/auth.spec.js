const expect = require('chai').expect;
const supertest = require('supertest');
const server = require('../../app');
const request = supertest(server);
const User = require('../../server/model/user');
const helper = require('../helper/db.helper');

describe('Authenticate API', () => {
  helper.resetDB();

  let userNotSave = {
    email: 'nhatndm11933333@gmail.com',
    password: '123456789',
    role: 'admin',
  };

  describe('POST /api/auth/register', function() {
    let regisRequest = '/api/auth/register';

    it('should return 201', function(done) {
      request.post(regisRequest)
        .send(userNotSave)
        .expect(201)
        .end((err, res) => {
          expect(res.body.user.email).to.equal(userNotSave.email);
          done();
        });
    });

    it('should return 422', function(done) {
      User.create(userNotSave, function(err, user) {
        request.post(regisRequest)
          .send(userNotSave)
          .expect(422)
          .end((err, res) => {
            expect(res.body.error.message).to.include('Email address is already in use');
            done();
          });
      });
    });
  });

  describe('POST /api/auth/login', function() {
    let loginRequest = '/api/auth/login';
    it('should return 201', function(done) {
      User.create(userNotSave, function(err, user) {
        request.post(loginRequest)
          .send({
            email: userNotSave.email,
            password: userNotSave.password,
          })
          .expect(200)
          .end((err, res) => {
            expect(res.header['access-token']).to.not.be.undefined;
            done();
          });
      });
    });
  });
});
