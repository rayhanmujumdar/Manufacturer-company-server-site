const { ObjectId } = require("mongodb");
const dbCollection = require("../db/dbCollection");
const nodemailerTransporter = require("../utilits/nodemailer");
const sendOrderMail = require("../utilits/sendOrderMail");

// dashboard all orders api
exports.allOrderCollectionController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const query = req.query;
  const result = (await orderCollection.find(query).toArray()).reverse();
  res.send(result);
};
// get all ordered product
exports.getOrderProductController = async (req, res) => {
  try {
    const { orderCollection } = await dbCollection();
    const orderData = req.body;
    const result = await orderCollection.insertOne(orderData);
    // send order mail function
    if (result?.acknowledged) {
      const mailOptions = sendOrderMail(orderData);
      const transporter = nodemailerTransporter();
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(info);
        }
      });
    }
    res.send(result);
  } catch (err) {
    // console.log(err.message);
  }
};

// ordered single data api
exports.getSingleOrderController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await orderCollection.findOne(filter);
  res.send(result);
};

// shipping orders api
exports.shippingOrdersController = async (req, res) => {
  const { orderCollection } = await dbCollection();
  const id = req?.params?.id;
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
  const query = { _id: ObjectId(id) };
  const result = await orderCollection.deleteOne(query);
  console.log(result);
  res.send(result);
};
