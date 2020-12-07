errorTypes = {
  'ValidationError': 422,
  'UniqueViolationError': 409,
  'CheckViolationError': 422
};

function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status('404');
  next(error);
};

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 
    ? errorTypes[err.name] || 500 
    : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? "🍑" : err.stack,
    errors: err.errors || undefined,
  });
};

module.exports = {
  notFound,
  errorHandler,
};