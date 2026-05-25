//

const Category = require("../models/Category");

const categorys = async (req, res) => {
  try {
    const { name } = req.body;
    const { restaurantId } = req.user;

    const category = await Category.create({
      restaurantId: restaurantId,
      name: name,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      restaurantId: req.user.restaurantId,
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  categorys,
  getCategories,
};
