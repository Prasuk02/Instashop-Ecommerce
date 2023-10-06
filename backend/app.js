const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const cors = require("cors");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// Route imports
const productRouter = require("./routes/productRoutes");
const userRouter = require('./routes/userRoutes');
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes")


app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

//Middleware for errors
app.use(errorMiddleware)

module.exports = app;
