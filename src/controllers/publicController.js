//

const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");
const Table = require("../models/Table");

const scanQR = async (req, res) => {
  try {
    const table = await Table.findOne({ qrToken: req.params.token });

    const categories = await Category.find({
      restaurantId: table.restaurantId,
    });

    const menu = await MenuItem.find({ restaurantId: table.restaurantId });

    res.status(201).json({ table, categories, menu });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  scanQR,
};
