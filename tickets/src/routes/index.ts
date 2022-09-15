import createTicketRoute from './new';
import { Application } from 'express';

const MountedRoutes = (app: Application) => {
  app.use('/', createTicketRoute);
};

export default MountedRoutes;
