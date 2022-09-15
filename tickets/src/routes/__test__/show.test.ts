import request from 'supertest';
import app from '../../app';
import Ticket from '../../models/ticket';

it('returns a 404 if the ticket is not found', async () => {
  await request(app).get('/api/tickets/shjdhdh').send().expect(404);
});

it('returns the ticket if the ticketis  found', async () => {});
