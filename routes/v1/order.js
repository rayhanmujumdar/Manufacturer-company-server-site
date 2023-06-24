const router = require("express").Router();
const {
  allOrderCollectionController,
  getSingleOrderController,
  shippingOrdersController,
  deleteOrderController,
  getOrderProductController,
} = require("../../controller/order");
const { verifyToken, verifyAdmin } = require("../../middleware/custom.middleware");

// * order api
// dashboard all orders api
router
  .route("/")
  .get(verifyToken, allOrderCollectionController)
  //add new order product api
  // TODO: previous path -> /productOrder
  .post(verifyToken, getOrderProductController);
router
  .route("/:id")
  // get ordered single data api
  .get(verifyToken, getSingleOrderController)
  // shipping orders api
  // TODO: previous path -> /orderShipping/:id
  .patch(verifyToken, verifyAdmin, shippingOrdersController)
  //TODO: previous path -> /deleteOrder/:id
  // delete product order api
  .delete(verifyToken, deleteOrderController);

module.exports = router;
