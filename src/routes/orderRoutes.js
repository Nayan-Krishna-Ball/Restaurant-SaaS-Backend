const express = require("express");
const {
  createOrder,
  getOrders,
  updateStatus,
  getOrderById,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");

const orderRoutes = express.Router();

orderRoutes.post("/order", createOrder);
orderRoutes.get("/get-orders", auth, getOrders);
orderRoutes.get("/get-single-order/:id", getOrderById);
orderRoutes.patch("/:id", auth, updateStatus);

module.exports = orderRoutes;
