const ErrorHandler = require("../utils/errorHandler");

//(data passed by previous middleware, request, response, next)
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Cast error: wrong mongoDb id error
  if (err?.message?.name === "CastError") {
    const message = `Resourse not found, invalid id ${err?.message?.path}`;
    err.message = message
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
