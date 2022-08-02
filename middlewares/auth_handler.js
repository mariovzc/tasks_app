import { unauthorized } from '@hapi/boom';

function checkApiKey(req, res, next) {
  const api_key = req.headers?.api;
  if (api_key === process.env.API_KEY) {
    next();
  } else {
    next(unauthorized("sin permiso"));
  }
}

export { checkApiKey };
