const express = require("express");
const {
  sslPayment,
  paymentSuccess,
  paymentFail,
} = require("../controllers/paymentController");

const paymentRoutes = express.Router();

paymentRoutes.post("/ssl-payment", sslPayment);

paymentRoutes.post("/success/:tranId", paymentSuccess);

paymentRoutes.post("/fail", paymentFail);

paymentRoutes.post("/cancel", paymentFail);

module.exports = paymentRoutes;
