const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

describe('Stream API', () => {
  describe('GET /api/stream/getdata', () => {
    it('should return 405', (done) => {
      request.get('/api/stream/getdata')
        .expect(405)
        .end((err, res) => {
          done(err);
        });
    });
  });
});
