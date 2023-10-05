const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// Route imports
const productRouter = require("./routes/productRoutes");
const userRouter = require('./routes/userRoutes');
const orderRouter = require("./routes/orderRoutes");


app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

//Middleware for errors
app.use(errorMiddleware)

module.exports = app;
