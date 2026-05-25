const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/auth");

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.get("/me", auth, getMe);

module.exports = authRoutes;
