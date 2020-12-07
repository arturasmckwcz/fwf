const supertest = require('supertest');

const app = require('../app');

describe('GET /api', () => {
  it('should respond with message', async () => {
    const response = await supertest(app)
      .get('/api')
      .expect('Content-type', /json/)
      .expect(200);
    expect(response.body.message)
      .toEqual("FWF API");
  });
});