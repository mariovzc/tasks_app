import { Router } from 'express';
import passport from 'passport';
import isBoomError from '../utils/boom_errors.js';
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    try {
      const user = req.user
      const payload = {sub: user.email}
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })
      return res.status(200).json({
        user,
        token
      });
    } catch (err) {
      throw isBoomError(err, res);
    }
  }
);

export default router;
