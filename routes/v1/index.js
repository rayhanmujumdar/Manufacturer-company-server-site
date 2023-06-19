const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const orderRouter = require("./order");
const reviewRouter = require("./review");
const paymentRouter = require("./payment");

/**
 * @api {get}
 * @apiDescription check and test api route
 * @apiPermission All people get in api
 *
 * @apiSuccess success
 * @apiError No custom error send
 */
router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "success",
  });
});

router.use("/api/v1/user", userRouter);
router.use("/api/v1/product", productRouter);
// TODO: previous path -> api/v1/tools/orders
router.use("/api/v1/order", orderRouter);
router.use("/api/v1/review", reviewRouter);
router.use("/api/v1/payment", paymentRouter);

module.exports = router;
