import { badRequest } from '@hapi/boom';

function validatorHandler(schema, property) {
  return (req, _res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(badRequest(error));
    }
    next();
  };
}

export default validatorHandler;
