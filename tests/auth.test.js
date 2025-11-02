const request = require('supertest');
const app = require('../src/server');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth endpoints', () => {
  test('register + login flow', async () => {
    const reg = await request(app).post('/api/register').send({ username: 'prem', email: 'p@example.com', password: 'pass123' });
    expect(reg.statusCode).toBe(201);
    const login = await request(app).post('/api/login').send({ email: 'p@example.com', password: 'pass123' });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeTruthy();
  });
});
