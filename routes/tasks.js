import { Router } from 'express';

import TaskService from '../services/tasks.js';

const router = Router();

const tasksService = new TaskService();

router.get('/', (req, res) => {
  const items = tasksService.get_all();
  res.json(items);
});

router.get('/:item_id', (req, res) => {
  const { item_id } = req.params;
  const item = tasksService.get_one(item_id);
  res.json(item);
});

router.post('/', (req, res) => {
  const { body } = req;

  const task = tasksService.create(body);

  res.status(201).json({
    message: 'created',
    data: {
      id: task.id,
      resource: `/tasks/${task.id}`,
    },
  });
});

router.patch('/:item_id', (req, res) => {
  const { item_id } = req.params;
  const { body } = req;

  tasksService.update(item_id, body);
  res.status(204).json();
});

router.delete('/:item_id', (req, res) => {
  const { item_id } = req.params;
  tasksService.delete(item_id);

  res.status(204).json();
});

export default router;
