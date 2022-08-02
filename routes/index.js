import taskRouter from './tasks.js';
import UserRouter from './users.js';
export default function routerApi(app) {
  app.use('/tasks', taskRouter);
  app.use('/users', UserRouter);
}
