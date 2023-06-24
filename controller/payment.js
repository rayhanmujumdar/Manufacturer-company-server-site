const error = require("../utilits/error");
const {
  paymentGetWayService,
  addNewPaymentInfoService,
  orderPaymentUpdateService,
  sendPaymentMailService,
} = require("../services/payment");
const { getSingleOrderService } = require("../services/order");
// Stripe Payment gat way
exports.paymentGetWayController = async (req, res, next) => {
  try {
    const { price } = req.body;
    const paymentIntent = await paymentGetWayService({
      price: price,
      currency: "usd",
      method: ["card"],
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch {
    next(error(500, "Internal server error"));
  }
};

// order payment update
exports.orderPaymentUpdateController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const paymentInfo = req.body;
    await addNewPaymentInfoService({ ...paymentInfo, createAt: Date.now() });
    const orderInfo = await getSingleOrderService(id);
    sendPaymentMailService({orderInfo,paymentInfo}); // Payment confirmation mail send to client
    const result = await orderPaymentUpdateService({
      id,
      transactionId: paymentInfo?.transactionId,
    });
    res.json(result);
  } catch {
    next(error(500, "Internal server error"));
  }
};
