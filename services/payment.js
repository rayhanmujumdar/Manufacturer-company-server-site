const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

exports.paymentGetWayService = async ({ price, currency, method }) => {
  return stripe?.paymentIntents.create({
    amount: price,
    currency: currency,
    payment_method_types: method,
  });
};

exports.addNewPaymentInfoService = async (payInfo) => {
  const { paymentCollection } = await dbCollection();
  return paymentCollection.insertOne(payInfo);
};

exports.orderPaymentUpdateService = async ({ id, transactionId }) => {
  const { orderCollection } = await dbCollection();
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: {
      paid: true,
      transactionId,
    },
  };
  return orderCollection.updateOne(filter, updateDoc);
};
