//

const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  name: String,

  description: String,

  price: Number,

  image: String,

  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
