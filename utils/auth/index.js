import passport from 'passport';
import jwtStrategy from './strategies/jwt.js';

import localStrategy from './strategies/local.js';

export default () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};
