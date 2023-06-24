const { getReviewsService, addReviewService } = require("../services/review");
const error = require("../utilits/error");

// home section review collection controller
exports.homeReviewController = async (req, res, next) => {
  try {
    const query = req.query;
    const result = await getReviewsService(query)("createAt")(3);
    res.json(result);
  } catch (err) {
    console.log(err);
    next(error(500, 'Internal server error'));
  }
};

// all reviews controller
exports.allReviewsController = async (req, res, next) => {
  try {
    const query = req.query;
    const result = await getReviewsService(query)("createAt")(0);
    res.json(result);
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// add new feedback api controller
exports.addReviewsController = async (req, res, next) => {
  try {
    const decoded = req.decoded.email;
    const email = req.query.email;
    const review = req.body;
    if (decoded === email) {
      const result = await addReviewService(review);
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};
