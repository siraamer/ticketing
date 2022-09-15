import request from 'supertest';
import app from '../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .post('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
}, 30000);

it('responds with null if not authenticate', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
