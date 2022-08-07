import taskRouter from './tasks.js';
import UserRouter from './users.js';
import AuthRouter from './auth.js';
import passport from 'passport';

export default function routerApi(app) {
  app.use(
    '/tasks',
    passport.authenticate('jwt', { session: false }),
    taskRouter
  );
  app.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    UserRouter
  );
  app.use('/auth', AuthRouter);
}
