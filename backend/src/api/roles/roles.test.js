const supertest = require('supertest');

const app = require('../../app');

console.log("🐿🐿🐿", process.env.NODE_ENV);

describe('GET /api/roles', () => {
  it('should respond with array', async () => {
    const response = await supertest(app)
      .get('/api/roles')
      .expect('Content-type', /json/)
      .expect(200);
    expect(Object.keys(response.body))
      .toBeInstanceOf(Array);
  });
});