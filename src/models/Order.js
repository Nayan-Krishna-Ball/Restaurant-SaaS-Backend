//

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    // restaurantName: String,
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
    tableName: String,

    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      default: "UNPAID",
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
