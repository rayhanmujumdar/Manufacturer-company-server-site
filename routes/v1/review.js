const router = require("express").Router();
const {
  homeReviewController,
  allReviewsController,
  addReviewsController,
} = require("../../controller/controller");
const { verifyToken } = require("../../middleware/custom.middleware");

// * reviews api
// home section review collection api
// TODO: previous path -> /homeReview
router.get("/home", homeReviewController);
router
  .route("/")
  // all reviews data api
  //TODO: previous path -> /allReviews
  .get(verifyToken, allReviewsController)
  // add reviews api
  //TODO: previous path -> /addReview
  .post(verifyToken, addReviewsController);

module.exports = router;
