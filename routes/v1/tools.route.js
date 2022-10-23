const express = require("express");

const router = express.Router();
const {
  singleProductController,
  userCollectionController,
  findAllUserController,
  getAllProductController,
  getUpdateQuantityController,
  getOrderProductController,
  deleteProductController,
  homeReviewController,
  allReviewsController,
  allOrderCollectionController,
  addReviewsController,
  newProductController,
  manageProductController,
  updateProductController,
  adminCreateController,
  getAdminEmailController,
  deleteAdminController,
  getSingleOrderController,
  orderPaymentUpdateController,
  shippingOrdersController,
  paymentGetWayController,
} = require("../../controller/controller");
const {
  verifyToken,
  verifyAdmin,
} = require("../../middleware/custom.middleware");

// * user and admin api
// user collection api
router.put("/user/:email", userCollectionController);
// find all user api
router.get("/user", verifyToken, findAllUserController);
// admin email get api
router.get("/admin/:email", verifyToken, getAdminEmailController);
// Make a admin api
router.put(
  "/user/admin/:email",
  verifyToken,
  verifyAdmin,
  adminCreateController
);

// * payment api
// Stripe Payment gat way
router.post("/create-payment-intent", verifyToken, paymentGetWayController);

// * reviews api
// home section review collection api
router.get("/homeReview", homeReviewController);
// all reviews data api
router.get("/allReviews", verifyToken, allReviewsController);
// add reviews api
router.post("/addReview", verifyToken, addReviewsController);

// * order api
// dashboard all orders api
router.get("/orders", verifyToken, allOrderCollectionController);
// ordered single data api
router.get("/orders/:id", verifyToken, getSingleOrderController);
// order payment update
router.patch("/orderPayment/:id", verifyToken, orderPaymentUpdateController);
// shipping orders api
router.patch("/orderShipping/:id",
  verifyToken,
  verifyAdmin,
  shippingOrdersController
);

// * Delete Api
// deleted admin api
router.put(
  "/deleteAdmin/:email",
  verifyToken,
  verifyAdmin,
  deleteAdminController
);
// delete product api
router.delete(
  "/deleteProduct/:id",
  verifyToken,
  verifyAdmin,
  deleteProductController
);
// delete product order api
router.delete("/deleteOrder/:id", verifyToken, deleteProductController);

// *product Api
// Add a new Product api
router.post("/addProduct", verifyToken, newProductController);
// manage product api
router.get("/manageProduct", verifyToken, manageProductController);
//get all product api
router.get("/product", getAllProductController);
//get order product api
router.post("/productOrder", verifyToken, getOrderProductController);
// update product api
router.put("/updateProduct/:id", verifyToken, updateProductController);
// find a single product api controller
router
  .route("/product/:id")
  /**
   * @api {get} /tools All tools
   * @apiDescription get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization user's access token
   *
   * @apiParam
   * @apiParam
   *
   * @apiSuccess
   *
   * @apiError (Unauthorize 401) unauthorize only authorize users can access the data
   * @apiError (Forbidden 403)   only admin can access the data
   */
  .get(verifyToken, singleProductController)
  /**
   * @api {post} /tools save a tools
   * @apiDescription post all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization user's access token
   *
   * @apiParam
   * @apiParam
   *
   * @apiSuccess
   *
   * @apiError (Unauthorize 401) unauthorize only authorize users can access the data
   * @apiError (Forbidden 403)   only admin can access the data
   */
  // update quantity api
  .put(verifyToken, getUpdateQuantityController);

module.exports = router;
