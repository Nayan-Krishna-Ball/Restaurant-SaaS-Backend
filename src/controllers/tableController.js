///

const { v4: uuid } = require("uuid");
const Table = require("../models/Table");
const QRCode = require("qrcode");

const tables = async (req, res) => {
  try {
    const { name } = req.body;
    const { restaurantId } = req.user;

    const token = uuid();

    const table = await Table.create({
      restaurantId: restaurantId,
      name: name,
      qrToken: token,
    });

    //for create qr
    const url = `${process.env.FRONTEND_URL}/qr/${token}`;
    const qr = await QRCode.toDataURL(url);

    res.status(201).json({
      success: true,
      table,
      qr,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  tables,
};
