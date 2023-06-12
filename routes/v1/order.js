const router = require("express").Router();
const {
  allOrderCollectionController,
  getSingleOrderController,
  shippingOrdersController,
  deleteProductController,
  getOrderProductController,
} = require("../../controller/controller");

// * order api
// dashboard all orders api
router.route('/').
get(verifyToken, allOrderCollectionController)
//add new order product api
// TODO: previous path -> /productOrder
.post(verifyToken, getOrderProductController);
// get ordered single data api
router.get("/:id", verifyToken, getSingleOrderController);
// shipping orders api
// TODO: previous path -> /orderShipping/:id
router.patch(
  "/shipping/:id",
  verifyToken,
  verifyAdmin,
  shippingOrdersController
);

// delete product order api
router.delete("/deleteOrder/:id", verifyToken, deleteProductController);

module.exports = router;
