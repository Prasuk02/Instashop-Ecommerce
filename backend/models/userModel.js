const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pls Enter your name"],
    minLength: [3, "Name should atleast have 3 characters"],
    maxLength: [30, "Name Cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Pls Enter your email"],
    unique: [true, "Email id already exist, Try another one"],
    validate: [validator.isEmail, "Pls Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Pls Enter your password"],
    minLength: [8, "Password should have atleast 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Pls re-enter your password"],
    validate: [
      function () {
        return this.password === this.confirmPassword;
      },
      "Re-enter the same password again",
    ],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPassword: String,
  resetPasswordExpiry: Date,
});

userSchema.pre("save", async function (next) {
  // condition to prevent password to get hashed again on update command
  if (!this.isModified('password')) {
    console.log(" NOT HASHING PASSWORD");
    return next();
  }
  // const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  console.log(hashedPassword);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
