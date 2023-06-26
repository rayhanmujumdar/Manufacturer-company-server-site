const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");
const nodemailerTransporter = require("../utilits/nodemailer");
const sendOrderMail = require("../utilits/sendOrderMail");

exports.allOrderCollectionService =
  (query) =>
  async (sort = "createAt") => {
    const { orderCollection } = await dbCollection();
    const { limit, page, order, search, property } = query || {};
    const pageNum = parseInt(page) - 1 || 0;
    const limitNum = parseInt(limit) || 0;
    const sortOrder = order === "asc" ? 1 : order === "desc" ? -1 : -1;
    const filter = search
      ? property
        ? { [property]: search }
        : { name: search }
      : {};
      const count = await orderCollection.countDocuments()
      const data = await orderCollection
      .find(filter)
      .sort({ [sort]: sortOrder })
      .skip(pageNum * limitNum)
      .limit(limitNum)
      .toArray()
    return {data,count};
  };

exports.sendPurchaseMailService = async (order) => {
  const mailOptions = sendOrderMail(order);
  const transporter = nodemailerTransporter();
  return transporter.sendMail(mailOptions);
};

exports.getOrderProductService = async (order) => {
  const { orderCollection } = await dbCollection();
  return orderCollection.insertOne(order);
};

exports.getSingleOrderService = async (id) => {
  const { orderCollection } = await dbCollection();
  const filter = { _id: ObjectId(id) };
  return orderCollection.findOne(filter);
};

exports.shippingOrdersService = async ({ id, order }) => {
  const { orderCollection } = await dbCollection();
  const filter = { _id: ObjectId(id) };
  const updateDoc = {
    $set: order,
  };
  return orderCollection.updateOne(filter, updateDoc);
};

exports.deleteOrderService = async (id) => {
  const { orderCollection } = await dbCollection();
  const filter = { _id: ObjectId(id) };
  return orderCollection.deleteOne(filter);
};
