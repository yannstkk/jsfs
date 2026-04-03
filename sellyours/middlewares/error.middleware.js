const createError = require('http-errors');

const notFound = (req, res, next) => {
  next(createError(404));
};

const handleError = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message,
    status,
    url: req.url
  });
};

module.exports = { notFound, handleError };