///

const { v4: uuid } = require("uuid");
const Table = require("../models/Table");
const QRCode = require("qrcode");

const createTable = async (req, res) => {
  try {
    const { name } = req.body;
    const { restaurantId } = req.user;

    const token = uuid();

    //for create qrimage
    const url = `${process.env.FRONTEND_URL}/qr/${token}`;
    const qrImage = await QRCode.toDataURL(url);

    const table = await Table.create({
      restaurantId: restaurantId,
      name: name,
      qrToken: token,
      qrImage,
    });

    res.status(201).json({
      success: true,
      message: "Table Created Successfully",
      table,
      qrImage,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllTable = async (req, res) => {
  try {
    const { restaurantId } = req.user;

    const allTable = await Table.find({
      restaurantId: restaurantId,
    });

    //for create qr

    res.status(201).json({
      message: "All Tables fetched Successfully",
      success: true,
      allTable,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTable,
  getAllTable,
};
