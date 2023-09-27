const ErrorHandler = require("../utils/errorHandler");

module.exports = (catchAsyncError) => (req, res, next) => {
  Promise.resolve(catchAsyncError(req, res, next)).catch(next(new ErrorHandler(error.message, 400)));
};
