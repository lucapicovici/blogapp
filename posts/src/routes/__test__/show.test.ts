import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/posts for get requests', async () => {
  const response = await request(app).get('/api/posts');

  expect(response.status).not.toEqual(404);
});
