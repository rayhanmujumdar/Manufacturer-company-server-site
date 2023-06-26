const dbCollection = require("../db/dbCollection");
exports.getReviewsService =
  (query) =>
  async (sort = "createAt") => {
    const { limit, page, order, search, property } = query || {};
    const limitNum = parseInt(limit) || 0;
    const pageNum = parseInt(page) - 1 || 0;
    const { reviewsCollection } = await dbCollection();
    const count = await reviewsCollection.countDocuments();
    const sortOrder = order === "asc" ? 1 : order === "desc" ? -1 : -1;
    const filter = search
      ? property
        ? { [property]: search }
        : { email: search }
      : {};
    const data = await reviewsCollection
      .find(filter)
      .sort({ [sort]: sortOrder })
      .skip(pageNum * limitNum)
      .limit(limitNum)
      .toArray();

    return { data, count };
  };

exports.addReviewService = async (review) => {
  const { reviewsCollection } = await dbCollection();
  return reviewsCollection.insertOne({
    ...review,
    createAt: Date.now(),
  });
};
