const express = require("express");
const router = express.Router();

const {
  getProducts,
  createNewProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  addOrUpdateProductReview,
  getProductAllReviews,
  deleteReview,
} = require("../controllers/product");
const { isAuthUser, isAdmin } = require("../middleware/auth");

router.route("/products").get(getProducts);

router.route("/admin/product/new").post(isAuthUser, isAdmin, createNewProduct);

router
  .route("/admin/product/:id")
  .put(isAuthUser, isAdmin, updateProduct)
  .delete(isAuthUser, isAdmin, deleteProduct);

router.route("/product/:id").get(getProductById);

router
  .route("/product/review")
  .put(isAuthUser, addOrUpdateProductReview)

// // NOT WORKING WHY ?
// // router.route('/product/reviews').get(getProductAllReviews)
router.route('/reviews').get(getProductAllReviews).delete(isAuthUser, deleteReview)

module.exports = router;
