import { Router } from 'express';

import TaskService from '../services/tasks.js';
import validatorHandler from '../middlewares/validator_handler.js';

import {
  createTaskSchema,
  updateTaskSchema,
  getTaskSchema,
} from '../schemas/tasks.js';
import { checkApiKey } from '../middlewares/auth_handler.js';

const router = Router();

const tasksService = new TaskService();

router.get('/', checkApiKey, async (req, res) => {
  const items = await tasksService.get_all();
  res.json(items);
});

router.get(
  '/:item_id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { item_id } = req.params;
      const item = await tasksService.get_one(item_id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createTaskSchema, 'body'),
  async (req, res) => {
    const { body } = req;

    const task = await tasksService.create(body);

    res.status(201).json({
      message: 'created',
      data: {
        id: task.id,
        resource: `/tasks/${task.id}`,
      },
    });
  }
);

router.patch(
  '/:item_id',
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res) => {
    try {
      const { item_id } = req.params;
      const { body } = req;
      await tasksService.update(item_id, body);
      res.status(204).json();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.delete(
  '/:item_id',
  validatorHandler(getTaskSchema, 'params'),
  async (req, res) => {
    try {
      const { item_id } = req.params;
      await tasksService.delete(item_id);

      res.status(204).json();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

export default router;
