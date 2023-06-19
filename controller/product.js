const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");

// get all product controller
exports.getAllProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const query = res.query;
  const result = (await productCollection.find(query).toArray()).reverse();
  res.send(result);
};

// Add a new Product api
exports.newProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const productData = req.body;
  const email = req.query.email;
  const decoded = req.decoded.email;
  if (email === decoded) {
    const result = await productCollection.insertOne(productData);
    res.send(result);
  } else {
    res.status(403).send({
      message: "forbidden",
    });
  }
};

// manage product api
exports.manageProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const email = req.query.email;
  const decoded = req.decoded.email;
  if (email === decoded) {
    const result = (await productCollection.find({}).toArray()).reverse();
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// update product api
exports.updateProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const id = req.params.id;
  const email = req.query.email;
  const decoded = req.decoded.email;
  const updateProduct = req.body;
  if (email === decoded) {
    const filter = {
      _id: ObjectId(id),
    };
    const options = {
      upsert: true,
    };
    const updateDoc = {
      $set: updateProduct,
    };
    const result = await productCollection.updateOne(
      filter,
      updateDoc,
      options
    );
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// find a single product api controller
exports.singleProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const decoded = req?.decoded?.email;
  const email = req?.query?.email;
  if (email === decoded) {
    const params = req.params.id;
    const id = {
      _id: ObjectId(params),
    };
    const result = await productCollection?.findOne(id);
    res.send(result);
  } else {
    res.send({
      message: "Bad request",
    });
  }
};

// update quantity api
exports.getUpdateQuantityController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const id = req.params.id;
  const availableQuantity = req.body.quantity;
  const options = {
    upsert: true,
  };
  const filter = {
    _id: ObjectId(id),
  };
  const updateDoc = {
    $set: {
      availableQuantity,
    },
  };
  const result = await productCollection.updateOne(filter, updateDoc, options);
  res.send(result);
};

// delete product api
exports.deleteProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
};
