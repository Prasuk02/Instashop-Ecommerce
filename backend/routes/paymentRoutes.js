const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment");

const paymentRouter = express.Router();
const { isAuthUser } = require("../middleware/auth");

paymentRouter.route("/payment/process").post( isAuthUser , processPayment);

paymentRouter.route("/stripeapikey").get(isAuthUser, sendStripeApiKey);

module.exports = paymentRouter;