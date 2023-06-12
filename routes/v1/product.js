const router = require("express").Router();
const {
  newProductController,
  manageProductController,
  getAllProductController,
  updateProductController,
  singleProductController,
  getUpdateQuantityController,
  deleteProductController,
} = require("../../controller/controller");
const {
  verifyAdmin,
  verifyToken,
} = require("../../middleware/custom.middleware");

// Add a new Product api
//TODO: previous path -> /addProduct - POST
router
  .route("/")
  .get(getAllProductController)
  .post(verifyToken, newProductController);
// manage product api
// TODO: /product or /manageProduct are similar just one different is verifyToken.
router.get("/manageProduct", verifyToken, manageProductController);
//get all product api
// update product api
router.put("/updateProduct/:id", verifyToken, updateProductController);
// find a single product api controller
router
  .route("/:id")
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
  // update product quantity api
  //TODO: new add ->  verifyAdmin
  .put(verifyToken, getUpdateQuantityController)
  // delete product api
  .delete(verifyToken, verifyAdmin, deleteProductController);

module.exports = router;
