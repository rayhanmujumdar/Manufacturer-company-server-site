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

router
  .route("/")
  .get(getAllProductController)
  // Add a new Product api
  //TODO: previous path -> /addProduct - POST
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
  /** use JSDOC API documentation generator
   * @api {get} /:id
   * @apiDescription get a single product api
   * @apiPermission auth user
   *
   * @apiHeader {String} Authorization user's access token
   *
   * @apiParam
   * @apiParam
   *
   * @apiSuccess 200 status code is api success
   *
   * @apiError (Unauthorize 401) unauthorize only authorize users can access the data
   * @apiError (Forbidden 403)   only admin can access the data
   */
  .get(verifyToken, singleProductController)
  /**
   * @api {post} /:id
   * @apiDescription update product quantity api
   * @apiPermission auth user only
   *
   * @apiHeader {String} Authorization user's access token
   *
   * @apiParam
   * @apiParam
   *
   * @apiSuccess
   *
   * @apiError (Unauthorize 401) unauthorize only authorize users can access the data
   * @apiError (Forbidden 403)   only auth user can access the data
   */
  // update product quantity api
  //TODO: new add ->  verifyAdmin
  .put(verifyToken, getUpdateQuantityController)
  // delete product api
  .delete(verifyToken, verifyAdmin, deleteProductController);

module.exports = router;
