//

const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const Table = require("../models/Table");

const createOrder = async (req, res) => {
  try {
    const table = await Table.findOne({
      qrToken: req.body.tableToken,
    });

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    // const restaurant = await Restaurant.findById(table.restaurantId);

    // if (!restaurant) {
    //   return res.status(404).json({
    //     message: "Restaurant not found",
    //   });
    // }

    const total = req.body.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = await Order.create({
      restaurantId: table.restaurantId,
      // restaurantName: restaurant.name,
      tableId: table._id,
      tableName: table.name,
      items: req.body.items,
      total,
    });

    res.status(201).json({
      message: "Order create successfuly",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { restaurantId } = req.user;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Restaurant ID missing in token",
      });
    }

    const orders = await Order.find({ restaurantId })
      .populate("items.menuItemId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "READY",
      "SERVED",
      "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("items.menuItemId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItemId",
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateStatus,
  getOrderById,
};
