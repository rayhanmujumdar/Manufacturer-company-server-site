const dbCollection = require("../db/dbCollection");
exports.getReviewsService =
  (query) =>
  (sort = "createAt") =>
  async (limit = 0) => {
    const { reviewsCollection } = await dbCollection();
    return reviewsCollection
      .find(query)
      .sort({ [sort]: -1 })
      .limit(limit)
      .toArray();
  };

exports.addReviewService = async (review) => {
  const { reviewsCollection } = await dbCollection();
  return reviewsCollection.insertOne({
    ...review,
    createAt: Date.now(),
  });
};
