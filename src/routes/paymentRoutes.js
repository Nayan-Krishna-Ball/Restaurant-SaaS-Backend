const express = require("express");
const {
  sslPayment,
  paymentSuccess,
  paymentFail,
  paymentWithCash,
} = require("../controllers/paymentController");

const paymentRoutes = express.Router();

paymentRoutes.post("/ssl-payment", sslPayment);
paymentRoutes.post("/success/:tranId", paymentSuccess);
paymentRoutes.post("/fail", paymentFail);
paymentRoutes.post("/cancel", paymentFail);

//pay with cash
paymentRoutes.patch("/cash-payment/:tranId", paymentWithCash);

module.exports = paymentRoutes;
