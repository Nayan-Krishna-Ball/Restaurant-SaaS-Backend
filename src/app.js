const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const tableRoutes = require("./routes/tableRoutes");
const menuRoutes = require("./routes/menuRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const publicRoutes = require("./routes/publicRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);

app.use("/api/tables", tableRoutes);

app.use("/api/items", categoryRoutes);
app.use("/api/items", menuRoutes);

//public route (sacn qr than go to this routes)
app.use("/api/public", publicRoutes);

//order route
app.use("/api/public", orderRoutes);

//payment route
app.use("/api/payment", paymentRoutes);

module.exports = app;
