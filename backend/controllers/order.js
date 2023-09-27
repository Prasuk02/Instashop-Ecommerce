const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

//CREATE NEW ORDER
exports.newOrder = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    const newOrder = await orderModel.create(req.body);

    res.json({
      success: true,
      newOrder,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

// GET SINGLE ORDER DETAILS -- ADMIN
exports.getOrderDetails = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return next(
        new ErrorHandler("Order details not found, invalid order id", 401)
      );
    }

    res.json({
      success: true,
      order,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

// GET ALL ORDERS LIST --ADMIN
exports.getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await orderModel.find().populate("user", "name email");

    const totalAmount = allOrders.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);

    res.json({
      success: true,
      allOrders,
      totalAmount,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

// GET LOGGED IN USER ORDERS DETAIL
exports.getLoggedUserOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });

    res.json({
      success: true,
      orders,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

// UPDATE ORDER STATUS --ADMIN
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return next(
        new ErrorHandler("Order details not found, invalid order id", 401)
      );
    }

    if (order.orderStatus.status === "delivered") {
      return next(new ErrorHandler("Order has already been delivered", 400));
    }

    order.orderItems.forEach(async ({ product, quantity }) => {
      await updateStock(product, quantity);
    });

    order.orderStatus.status = req.body.status;

    if (req.body.status === "delivered") {
      order.orderStatus.deliveredAt = Date.now();
    }

    await order.save({
      validateBeforeSave: false,
    });

    res.json({
      success: true,
      status: order.orderStatus,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  if (!product) {
    return next(new ErrorHandler(`Product not found, invalid id: ${id}`, 401));
  }

  product.stock -= quantity;

  await product.save({
    validateBeforeSave: false,
  });
}

// DELETE ORDER -- ADMIN
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findByIdAndRemove(req.params.id);

    if (!order) {
      return next(
        new ErrorHandler("Order details not found, invalid order id", 401)
      );
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};
