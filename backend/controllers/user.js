const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const cloudinary = require('cloudinary')

exports.registerUser = async (req, res, next) => {
  try {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    })

    req.body.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }

    const user = await userModel.create(req.body);
    sendToken(user, 201, res);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please Enter email and password", 401));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 201, res);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

exports.logoutUser = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.send({
    success: true,
    message: "User logged out successfully",
  });
};

//GET USER DETAILS --me
exports.getUserDetails = async (req, res, next) => {
  const user = await userModel.findById({ _id: req.user._id });
  if (!user) {
    return next(new ErrorHandler("User does not exist", 401));
  }

  res.send({
    success: true,
    user,
  });
};

//UPDATE PASSWORD --LOGINED USER
exports.updateUserPassword = async (req, res, next) => {
  try {
    const user = await userModel
      .findById({ _id: req.user._id })
      .select("+password");

    if (!user) {
      return next(new ErrorHandler("User does not exist", 401));
    }

    const isValidPassword = await user.comparePassword(req.body.oldPassword);
    if (!isValidPassword) {
      return next(new ErrorHandler("Incorrect old Password", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Re-enter the same password again", 401));
    }

    user.confirmPassword = req.body.confirmPassword;
    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

// UPDATE PROFILE INFO --email, name, avatar
exports.updateDetails = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale'
  })

  req.body.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url
  }
  
  const user = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (!user) {
    return next(new ErrorHandler("User does not exist", 401));
  }

  res.send({
    success: true,
  });
};

// GET ALL USERS --admin only
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).send({
      success: true,
      users: allUsers,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

//GET SINGLE USER DETAIL --admin only
exports.getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }
    res.status(200).send({
      success: true,
      user,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

// UPDATE USER ROLE --admin only
exports.updateUserRole = async (req, res, next) => {
  try {
    const newData = {
      // name: req.body.name,
      // email: req.body.email,
      role: req.body.role,
    };

    const user = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      newData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!user) {
      return next(new ErrorHandler("User does not exist", 401));
    }

    res.send({
      success: true,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

// DELETE USER --ADMIN
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User does not exist", 401));
    }

    res.send({
      success: true,
      message: "User deleted successfully",
    })
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
}
