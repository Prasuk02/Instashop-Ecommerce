const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

exports.getProducts = async (req, res, next) => {
  try {
    const productsPerPage = 10;
    const productCount = await productModel.countDocuments();
    // const allProducts = await productModel.find();
    // let allProducts = await productModel.find().find({name: "Iphone 15"})
    const features = new ApiFeatures(productModel, req.query)
      .search()
      .filter()
      .pagination(productsPerPage);
    let allProducts = await features.query;
    res.status(200).send({
      success: true,
      allProducts,
      productCount,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// ADMIN ROUTE
exports.createNewProduct = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    const newProduct = await productModel.create(req.body);
    res.send({
      success: true,
      newProduct,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.send({
      success: true,
      productDetails: product,
    });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      messsage: "product data updated successfully",
      product,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    await productModel.findByIdAndRemove(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

//ADD REVIEW OR UPDATE REVIEW FOR PRODUCT
exports.addOrUpdateProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const newReview = {
      user: req.user._id,
      name: req.user.name,
      rating: +rating,
      comment,
    };

    const product = await productModel.findById(productId);

    if (!product) {
      return next(
        new ErrorHandler("Product not found: incorrect product id", 401)
      );
    }

    const isReviewed = product.reviews.find((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        return true;
      }
    });

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(newReview);
    }

    // updating total num of reviews
    product.numOfReviews = product.reviews.length;

    // updating average rating of product
    let totalRatings = product.reviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
    product.ratings = totalRatings / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.send({
      success: true,
      message: "Review added successfully",
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

//GET PARTICULAR PRODUCT REVIEWS
exports.getProductAllReviews = async (req, res, next) => {
  try {
    const reviews = await productModel.findById(req.query.id).select("reviews");

    if (!reviews) {
      return next(
        new ErrorHandler("Product not found: incorrect product id", 401)
      );
    }

    res.send({
      success: true,
      reviews,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};

//DELETE REVIEW --admin
exports.deleteReview = async (req, res, next) => {
  try {
    let product = await productModel.findById(req.query.productId);

    if (!product) {
      return next(
        new ErrorHandler("Product not found: incorrect product id", 401)
      );
    }

    const filteredReviews = product.reviews.filter((rev) => {
      return rev.user.toString() !== req.query.id.toString();
    });
    product.reviews = filteredReviews;

    // updating total num of reviews
    const numOfReviews = product.reviews.length;

    // updating average rating of product
    let totalRatings = product.reviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
    const ratings = product.reviews.length
      ? totalRatings / product.reviews.length
      : 0;

    product = await productModel.findByIdAndUpdate(
      req.query.productId,
      {
        reviews: filteredReviews,
        numOfReviews,
        ratings,
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.send({
      success: true,
      product,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 401));
  }
};
