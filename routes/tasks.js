import { Router } from 'express';

import TaskService from '../services/tasks.js';
import validatorHandler from '../middlewares/validator_handler.js';

import {
  createTaskSchema,
  updateTaskSchema,
  getTaskSchema,
} from '../schemas/tasks.js';

const router = Router();

const tasksService = new TaskService();

router.get('/', async (req, res) => {
  const items = await tasksService.get_all();
  res.json(items);
});

// TODO: crear router for /me
router.get("/me", async(req, res) => {
  const {user: {sub:id}} = req;
  const items = await tasksService.get_mines(id);
  res.json(items);
})

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
  async (req, res, next) => {
    try {
      const { body } = req;
      body["creator"] = req.user.sub
      const task = await tasksService.create(body);
      res.status(201).json({
        message: 'created',
        data: {
          id: task.id,
          resource: `/tasks/${task.id}`,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:item_id',
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const {user, body, params: {item_id}} = req;
      await tasksService.update(item_id, body, user.sub);
      res.status(204).json();
    } catch (error) {
      next(error)
    }
  }
);

export default router;
