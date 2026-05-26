//

const express = require("express");
const { getAllTable, createTable } = require("../controllers/tableController");
const auth = require("../middleware/auth");

const tableRoutes = express.Router();

tableRoutes.post("/create-table", auth, createTable);

//get all table with qr
tableRoutes.get("/get-all-table", auth, getAllTable);

module.exports = tableRoutes;
