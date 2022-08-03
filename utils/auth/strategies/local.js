import { Strategy } from 'passport-local';
import UserService from '../../../services/users.js';

const service = new UserService();

const localStrategy = new Strategy(
  { usernameField: 'email' },
  async (email, pass, done) => {
    try {
      const user = await service.login(email, pass);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStrategy;
