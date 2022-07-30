import express from 'express';
import db from './db.js';
import routerApi from './routes/index.js';
import {logErrors, errorHandler, boomErrorHandler}  from "./middlewares/error_handler.js"

db();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    api: 'ok',
  });
});

routerApi(app);

// errors middleware MUST be after app routing
// You MUST check the order
app.use(logErrors)
app.use(boomErrorHandler);
app.use(errorHandler)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}`);
});
