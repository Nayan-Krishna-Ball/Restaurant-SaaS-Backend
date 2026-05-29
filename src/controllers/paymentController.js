//

const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("../models/Order");

const sslPayment = async (req, res) => {
  const store_id = process.env.SSL_STORE_ID;
  const store_passwd = process.env.SSL_STORE_PASSWORD;
  const is_live = false;

  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const tranId = order._id.toString();

    const data = {
      total_amount: order.total,
      currency: "BDT",
      tran_id: tranId,

      success_url: `${process.env.BACKEND_URL}/api/payment/success/${tranId}`,
      fail_url: `${process.env.BACKEND_URL}/api/payment/fail`,
      cancel_url: `${process.env.BACKEND_URL}/api/payment/cancel`,

      ipn_url: `${process.env.BACKEND_URL}/api/payment/ipn`,

      shipping_method: "NO",

      product_name: "Restaurant Order",
      product_category: "Food",
      product_profile: "general",

      cus_name: "Customer",
      cus_email: "customer@test.com",
      cus_add1: "Bangladesh",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",

      ship_name: "Customer",
      ship_add1: "Bangladesh",
      ship_city: "Dhaka",
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const apiResponse = await sslcz.init(data);

    return res.status(200).json({
      success: true,
      paymentUrl: apiResponse.GatewayPageURL,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    // const orderId = req.body.tran_id;
    const orderId = req.params.tranId;

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "PAID_SSL",
    });

    res.redirect(`${process.env.FRONTEND_URL}/payment-success/${orderId}`);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const paymentFail = async (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
};

//payment with cash
const paymentWithCash = async (req, res) => {
  try {
    // const orderId = req.body.tran_id;
    const orderId = req.params.tranId;

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "PAY_WITH_CASH ",
    });

    //This is for dummy, it will redirect the paywith cash success page
    return res.status(200).json({
      success: true,
      orderId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sslPayment,
  paymentSuccess,
  paymentFail,
  paymentWithCash,
};
