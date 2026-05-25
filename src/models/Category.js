//

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  name: String,
});

module.exports = mongoose.model("Category", categorySchema);
