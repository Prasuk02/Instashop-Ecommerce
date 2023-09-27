const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    city: {
      type: String,
      required: [true, "Please enter your city"],
    },
    state: {
      type: String,
      required: [true, "Please enter your state"],
    },
    country: {
      type: String,
      default: "India",
    },
    pinCode: {
      type: Number,
      required: [true, "Please enter your pincode"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Please enter your mobile number"],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  orderStatus: {
    status: {
        type: String,
        default: "Processing"
    },
    deliveredAt: {
        type: Date
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
});

const orderModel = mongoose.model("Order", orderSchema)

module.exports = orderModel