import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'task 1',
      done: false,
    },
    {
      id: 2,
      name: 'task 2',
      done: true,
    },
  ]);
});

router.get('/:item_id', (req, res) => {
  const {item_id}  = req.params
  res.json(
    {
      id: item_id,
      name: 'task 1',
      done: false,
    }
  )
})

export default router;
