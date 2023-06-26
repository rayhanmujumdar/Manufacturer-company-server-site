const { getReviewsService, addReviewService } = require("../services/review");
const error = require("../utilits/error");

// home section review collection controller
exports.homeReviewController = async (req, res, next) => {
  try {
    const query = req.query;
    const { data, count } = await getReviewsService(query)(query?.sort);
    res.append("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", `${count}`);
    res.json(data);
  } catch (err) {
    console.log(err);
    next(error(500, "Internal server error"));
  }
};

// all reviews controller
exports.allReviewsController = async (req, res, next) => {
  try {
    const query = req.query;
    const { data, count } = await getReviewsService(query)(query?.sort);
    res.append("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", `${count}`);
    res.json(data);
  } catch (err) {
    console.log(err)
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
