import { Router } from 'express';

const router = Router();

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
  const { item_id } = req.params;
  res.json({
    id: item_id,
    name: 'task 1',
    done: false,
  });
});

router.post('/', (req, res) => {
  const { body } = req;

  res.status(201).json({
    message: 'updated',
    data: body,
  });
});

router.patch('/:item_id', (req, res) => {
  res.status(204).json();
});

router.delete('/:item_id', (req, res) => {
  res.status(204).json();
});

export default router;
