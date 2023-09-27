const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserPassword,
  updateDetails,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
} = require("../controllers/user");
const { isAuthUser, isAdmin } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").get(logoutUser);

userRouter.route("/me").get(isAuthUser, getUserDetails);

userRouter.route("/password/update").put(isAuthUser, updateUserPassword);

userRouter.route("/me/update").put(isAuthUser, updateDetails);

userRouter.route("/admin/users").get(isAuthUser, isAdmin, getAllUsers);

userRouter
  .route("/admin/users/:id")
  .get(isAuthUser, isAdmin, getUserById)
  .delete(isAuthUser, isAdmin, deleteUser)
  .put(isAuthUser, isAdmin, updateUserRole);

module.exports = userRouter;
