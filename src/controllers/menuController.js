//

const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");

const menuItems = async (req, res) => {
  try {
    const { name, categoryId, price } = req.body;
    const { restaurantId } = req.user;

    // console.log("Restaurant ID:", restaurantId);
    // const findCategoryId = await Category.findOne({
    //   restaurantId: restaurantId,
    // });
    // console.log("findCategoryId ID:", findCategoryId);

    const menuItems = await MenuItem.create({
      restaurantId: restaurantId,
      name: name,
      categoryId: categoryId,
      price: price,
    });

    res.status(201).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  menuItems,
};
