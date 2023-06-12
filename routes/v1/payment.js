const router = require("express").Router();
const {
  paymentGetWayController,
  orderPaymentUpdateController,
} = require("../../controller/controller");
const { verifyToken } = require("../../middleware/custom.middleware");

// * payment api
// Stripe Payment gat way
router.post("/create-payment-intent", verifyToken, paymentGetWayController);
// order payment update
//TODO: previous path -> /orderPayment/:id
router.patch("/order/:id", verifyToken, orderPaymentUpdateController);

module.exports = router;
