import { Application } from 'express';
import signupRoute from './signup';
import signinRoute from './signin';
import signoutRoute from './signout';
import currentUserRoute from './currentuser';

const MountRoutes = (app: Application) => {
  app.use('/api/users', signupRoute);
  app.use('/api/users', signinRoute);
  app.use('/api/users', signoutRoute);
  app.use('/api/users', currentUserRoute);
};

export default MountRoutes;
