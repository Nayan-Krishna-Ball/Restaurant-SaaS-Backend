const express = require("express");
const auth = require("../middleware/auth");
const { menuItems } = require("../controllers/menuController");

const menuRoutes = express.Router();

menuRoutes.post("/menu", auth, menuItems);

module.exports = menuRoutes;
