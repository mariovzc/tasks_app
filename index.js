import express from 'express';
import db from './db.js';
import routerApi from './routes/index.js';

db();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
  res.json({
    api: 'ok',
  });
});

routerApi(app);

app.use(function (_, res) {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${PORT}`);
});
