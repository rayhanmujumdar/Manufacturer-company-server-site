const dbCollection = require("../db/dbCollection");

// home section review collection controller
exports.homeReviewController = async (req, res) => {
  const { reviewsCollection } = await dbCollection();
  const query = req.query;
  const result = (await reviewsCollection.find(query).toArray()).reverse();
  res.send(result);
};

// all reviews controller
exports.allReviewsController = async (req, res) => {
  const { reviewsCollection } = await dbCollection();
  const query = req.query;
  const result = (await reviewsCollection.find(query).toArray()).reverse();
  res.send(result);
};

// add new feedback api controller
exports.addReviewsController = async (req, res) => {
  const { reviewsCollection } = await dbCollection();
  const decoded = req.decoded.email;
  const email = req.query.email;
  if (decoded === email) {
    const review = req.body;
    const result = await reviewsCollection.insertOne(review);
    res.send(result);
  }
};
