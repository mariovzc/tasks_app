import { Router } from 'express';

import UserService from '../services/users.js';
import validatorHandler from '../middlewares/validator_handler.js';

import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from '../schemas/users.js';
import { checkApiKey } from '../middlewares/auth_handler.js';

const router = Router();

const usersService = new UserService();

router.get('/', checkApiKey, async (req, res) => {
  const items = await usersService.get_all();
  res.json(items);
});

router.get(
  '/:email',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { email } = req.params;
      const item = await usersService.get_one(email);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const { body } = req;
    const user = await usersService.create(body);
    res.status(201).json({
      message: 'created',
      data: {
        id: user.id,
        resource: `/users/${user.id}`,
      },
    });
  }
);

router.patch(
  '/:email',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { email } = req.params;
      const { body } = req;
      await usersService.update(email, body);
      res.status(204).json();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

export default router;
