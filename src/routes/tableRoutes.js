//

const express = require("express");
const { tables } = require("../controllers/tableController");
const auth = require("../middleware/auth");

const tableRoutes = express.Router();

tableRoutes.post("/table", auth, tables);

module.exports = tableRoutes;
