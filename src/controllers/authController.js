//

const bcrypt = require("bcryptjs");

const Restaurant = require("../models/Restaurant");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { restaurantName, name, email, password } = req.body;

    const restaurant = await Restaurant.create({
      name: restaurantName,
    });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      restaurantId: restaurant._id,

      name,

      email,

      password: hashed,

      role: "ADMIN",
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = generateToken(user);

  res.json({
    token,
  });
};

const getMe = async (req, res) => {
  try {
    const { restaurantId } = req.user;

    if (!restaurantId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({
      restaurantId,
    })
      .populate("restaurantId", "name")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User Detatils",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
