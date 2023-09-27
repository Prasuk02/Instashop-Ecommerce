const express = require("express");
const { newOrder, getOrderDetails, getAllOrders, getLoggedUserOrders, deleteOrder, updateOrderStatus } = require("../controllers/order");
const { isAuthUser, isAdmin } = require("../middleware/auth");
const orderRouter = express.Router();

orderRouter.route("/order/new").post(isAuthUser, newOrder);

orderRouter.route("/order/:id").get(isAuthUser, getOrderDetails)

orderRouter.route("/orders/me").get(isAuthUser, getLoggedUserOrders)

orderRouter.route("/admin/orders").get(isAuthUser, isAdmin, getAllOrders)

orderRouter.route("/admin/order/:id").delete(isAuthUser, isAdmin, deleteOrder).put(isAuthUser, isAdmin, updateOrderStatus)

module.exports = orderRouter;