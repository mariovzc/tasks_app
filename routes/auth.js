import { Router } from 'express';
import passport from 'passport';
import isBoomError from '../utils/boom_errors.js';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    try {
      return res.status(200).json(req.user);
    } catch (err) {
      throw isBoomError(err, res);
    }
  }
);

export default router;
