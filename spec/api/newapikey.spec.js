const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);
const secretkey = require('../../server/config/secret');
const helper = require('../helper/db.helper');
const User = require('../../server/model/user');

describe('New API Key', () => {
  helper.resetDB();
  describe('POST /api/newApiKey', () => {
    it('should return 201, return apikey', (done) => {
      request.post('/api/newApiKey')
        .send({
          'email': 'nhatndm1193@gmail.com',
          'secretkey': secretkey.secretCODE,
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.apikey).to.not.be.undefined;
          done();
        });
    });
  });

  describe('POST /api/newApiKey', () => {
    it('check this apikey is saved', (done) => {
      request.post('/api/newApiKey')
        .send({
          'email': 'nhatndm1193@gmail.com',
          'secretkey': secretkey.secretCODE,
        })
        .expect(201)
        .end((err, res) => {
          User.findOne({'email': 'nhatndm1193@gmail.com'}, (err, foundUser) => {
            expect(foundUser).to.not.be.undefined;
            expect(foundUser.apikey).to.eq(res.body.apikey);
            done();
          });
        });
    });
  });

  describe('POST /api/newApiKey', () => {
    it('return 405 if secret key is wrong', (done) => {
      request.post('/api/newApiKey')
        .send({
          'email': 'nhatndm1193@gmail.com',
          'secretkey': 'sdsdsdsdsdsdsdsdsd',
        })
        .expect(405)
        .end((err, res) => {
          done();
        });
    });
  });
});
