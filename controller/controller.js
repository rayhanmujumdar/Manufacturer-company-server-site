const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

// find a single product api controller
exports.singleProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const decoded = req?.decoded?.email;
  console.log(decoded)
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

// user collection api controller
exports.userCollectionController = async (req, res) => {
  const { userCollection } = await dbCollection();
  const email = req.params.email;
  const user = req.body;
  const filter = {
    email: email,
  };
  const updateDoc = {
    $set: user,
  };
  const options = {
    upsert: true,
  };
  const result = await userCollection.updateOne(filter, updateDoc, options);
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.send({
    token,
    result,
  });
};

// find a all users api controller
exports.findAllUserController = async (req, res) => {
  const { userCollection } = await dbCollection();
  const email = req.query.email;
  const decoded = req.decoded.email;
  if (email === decoded) {
    const result = (await userCollection.find({}).toArray()).reverse();
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

exports.getAllProductController = async (req, res) => {
  const { productCollection } = await dbCollection();
  const query = res.query;
  const result = (await productCollection.find(query).toArray()).reverse();
  res.send(result);
};

exports.getOrderProductController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const orderData = req.body;
  const result = await orderCollection.insertOne(orderData);
  res.send(result);
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
// home section review collection api
exports.homeReviewController = async (req, res) => {
  const { reviewsCollection } = await dbCollection();
  const query = req.query;
  const result = (await reviewsCollection.find(query).toArray()).reverse();
  res.send(result);
};
// all reviews data api
exports.allReviewsController = async (req, res) => {
  const { reviewsCollection } = await dbCollection();
  const query = req.query;
  const result = (await reviewsCollection.find(query).toArray()).reverse();
  res.send(result);
};

// dashboard all orders api
exports.allOrderCollectionController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const query = req.query;
  const result = (await orderCollection.find(query).toArray()).reverse();
  res.send(result);
};
// ordered single data api
exports.getSingleOrderController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await orderCollection.findOne(filter);
  res.send(result);
};

// order payment update
exports.orderPaymentUpdateController = async (req, res) => {
  const { orderCollection, paymentCollection } = await dbCollection();
  const id = req.params.id;
  const payment = req.body;
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: {
      paid: true,
      transactionId: payment?.transactionId,
    },
  };
  await paymentCollection.insertOne(payment);
  const updateOrder = await orderCollection.updateOne(filter, updateDoc);
  res.send(updateOrder);
};

// shipping orders api
exports.shippingOrdersController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: { delivery: true },
  };
  const result = await orderCollection.updateOne(filter, updateDoc);
  res.send(result);
};
// delete product api
exports.deleteProductController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const id = req.params.id;
  console.log(id);
  const filter = {
    _id: ObjectId(id),
  };
  const result = await orderCollection.deleteOne(filter);
  res.send(result);
};
// add reviews api
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

// Make a admin api
exports.adminCreateController = async (req, res) => {
  const { userCollection } = await dbCollection();
  const makeAdminEmail = req.params.email;
  const decoded = req.decoded.email;
  const email = req.body.email;
  if (email === decoded) {
    const filter = { email: makeAdminEmail };
    console.log(filter);
    const updateDoc = {
      $set: { role: "admin" },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// admin email get api
exports.getAdminEmailController = async (req, res) => {
  const { userCollection } = await dbCollection();
  const email = req.params.email;
  const decoded = req.decoded.email;
  if (email === decoded) {
    const user = await userCollection.findOne({ email: email });
    const isAdmin = user?.role === "admin";
    res.send({ admin: isAdmin });
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// deleted admin api
exports.deleteAdminController = async (req, res) => {
  const { userCollection } = await dbCollection();
  const authEmail = req.body.email;
  const decoded = req.decoded.email;
  if (authEmail === decoded) {
    const email = req.params.email;
    const filter = { email: email };
    const updateDoc = {
      $set: { role: null },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

// Stripe Payment gat way
exports.paymentGetWayController = async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe?.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
