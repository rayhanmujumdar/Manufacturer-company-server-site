const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");
exports.getAllProductService =
  (query) =>
  async (sort = "createAt") => {
    const { productCollection } = await dbCollection();
    const { page, limit, order } = query || {};
    const pageNum = parseInt(page) - 1 || 0;
    const limitNum = parseInt(limit) || 0;
    const count = await productCollection.countDocuments({});
    const sortOrder = order === "asc" ? 1 : order === "desc" ? -1 : -1;
    const product = await productCollection
      .find({})
      .sort({ [sort]: sortOrder })
      .skip(pageNum * limitNum)
      .limit(limitNum)
      .toArray();
    return { count, product };
  };

exports.newProductService = async (product) => {
  const { productCollection } = await dbCollection();
  return productCollection.insertOne({ ...product, createAt: Date.now() });
};

exports.updateProductService = async ({ id, product }) => {
  const { productCollection } = await dbCollection();
  const filter = {
    _id: ObjectId(id),
  };
  const options = {
    upsert: true,
  };
  const updateDoc = {
    $set: product,
  };
  return productCollection.updateOne(filter, updateDoc, options);
};

exports.singleProductService = async (id) => {
  const { productCollection } = await dbCollection();
  const filter = {
    _id: ObjectId(id),
  };
  return productCollection?.findOne(filter);
};

exports.deleteProductService = async (id) => {
  const { productCollection } = await dbCollection();
  const filter = { _id: ObjectId(id) };
  return productCollection.deleteOne(filter);
};
