import passport from 'passport';

import localStrategy from './strategies/local.js';

export default () => {
  passport.use(localStrategy);
};
