const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
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
