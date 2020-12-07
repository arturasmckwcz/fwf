const supertest = require('supertest');

const app = require('../../app');

console.log("🐿🐿🐿", process.env.NODE_ENV);

describe('GET /api/productions', () => {
  it('should respond with array', async () => {
    const response = await supertest(app)
      .get('/api/productions')
      .expect('Content-type', /json/)
      .expect(200);
    expect(Object.keys(response.body))
      .toBeInstanceOf(Array);
  });
});