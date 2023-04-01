const Category = require("../models/categorySchema");

// desc     Create Categories
// access   private
// route    POST /api/categories
const createCategory = async (req, res) => {
  try {
    const categ = new Category(req.body);
    await categ.save();
    res.status(200).json(categ);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// desc     Get Categories
// access   private
// route    GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categ = await Category.find();
    res.status(200).json(categ);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createCategory,
  getCategories,
};
