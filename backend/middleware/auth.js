const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      next(new ErrorHandler("Please login to access this feature", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData.id);

    next();
  } catch (error) {
    next(new ErrorHandler(error.message, 401));
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can access this feature"));
  }

  next();
};
