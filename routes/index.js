import taskRouter from './tasks.js';

export default function routerApi(app) {
  app.use('/tasks', taskRouter);
}
