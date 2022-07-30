import { Router } from 'express';

import TaskService from '../services/tasks.js';

const router = Router();

const tasksService = new TaskService();

router.get('/', async (req, res) => {
  const items = await tasksService.get_all();
  res.json(items);
});

router.get('/:item_id', async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const item = await tasksService.get_one(item_id);
    res.json(item);
  } catch (error) {
    next(error);
  }

});

router.post('/', async (req, res) => {
  const { body } = req;

  const task = await tasksService.create(body);

  res.status(201).json({
    message: 'created',
    data: {
      id: task.id,
      resource: `/tasks/${task.id}`,
    },
  });
});

router.patch('/:item_id', async (req, res) => {
  try {
    const { item_id } = req.params;
    const { body } = req;
    await tasksService.update(item_id, body);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({message: error.message})
  }
});

router.delete('/:item_id', async (req, res) => {
  const { item_id } = req.params;
  await tasksService.delete(item_id);

  res.status(204).json();
});

export default router;
