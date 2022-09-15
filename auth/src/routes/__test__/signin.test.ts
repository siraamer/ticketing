import request from 'supertest';
import app from '../../app';

it('fails when that a email does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(400);
}, 30000);

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email@email.com',
      password: 'passw2',
    })
    .expect(400);
}, 30000);

it('responds with cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
}, 30000);
