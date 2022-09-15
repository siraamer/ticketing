import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import createTicket from './routes/new';
import { errorHandler, NotFoundError, currentUser } from '@aamertickets/common';
const app = express();
app.set('trust proxy', true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(createTicket);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
