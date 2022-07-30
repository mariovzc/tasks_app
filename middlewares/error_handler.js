/* eslint-disable no-console */
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}


// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

export { logErrors, errorHandler };
