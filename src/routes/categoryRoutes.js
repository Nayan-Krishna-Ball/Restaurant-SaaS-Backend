const express = require("express");
const auth = require("../middleware/auth");
const {
  categorys,
  getAllCategory,
  getCategories,
} = require("../controllers/categoryController");

const categoryRoutes = express.Router();

categoryRoutes.post("/category", auth, categorys);
categoryRoutes.get("/get-all-category", auth, getCategories);

module.exports = categoryRoutes;
