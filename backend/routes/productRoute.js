// -- 3 --
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
} = require("../controllers/productController");

router.post("/", protect, adminOnly, createProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

router.patch("/:id", protect, adminOnly, updateProduct);
router.patch("/review/:id", protect, reviewProduct);
router.patch("/deleteReview/:id", protect, deleteReview);
router.patch("/updateReview/:id", protect, updateReview);

router.get("/", getProducts);
router.get("/:id", singleProduct);

module.exports = router;
