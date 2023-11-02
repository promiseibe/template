const express = require("express");
const {
  CreateProducts,
  getProducts,
  getProduct,
  deleteProducts,
  updateProduct,
  reviewProduct,
  deleteReview,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, adminOnly, CreateProducts)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.delete("/:id", protect, adminOnly, deleteProducts)
router.patch("/:id", protect, adminOnly, updateProduct)
router.patch("/review/:id", protect, reviewProduct)
router.delete("/deletereview/:id", protect, deleteReview)

module.exports = router;
