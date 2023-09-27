// CREATING TOKEN AND SAVING IN COOKIE

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expired: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRY
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token
  })
};

module.exports = sendToken