//

const express = require("express");
const { scanQR } = require("../controllers/publicController");

const publicRoutes = express.Router();

publicRoutes.get("/qr/:token", scanQR);

module.exports = publicRoutes;
