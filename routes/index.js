import taskRouter from './tasks.js';
import UserRouter from './users.js';
import AuthRouter from './auth.js';

export default function routerApi(app) {
  app.use('/tasks', taskRouter);
  app.use('/users', UserRouter);
  app.use('/auth', AuthRouter);
}
