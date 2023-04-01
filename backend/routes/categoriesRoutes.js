const express = require("express");
const router = express();
const auth = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

// desc     Create Categories
// access   private
// route    POST /api/categories
router.post("/", auth, createCategory);

// desc     Get Categories
// access   private
// route    GET /api/categories
router.get("/", auth, getCategories);

module.exports = router;
