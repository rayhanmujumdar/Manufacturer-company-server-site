const error = require("../utilits/error");
const {
  allOrderCollectionService,
  getOrderProductService,
  sendPurchaseMailService,
  getSingleOrderService,
  shippingOrdersService,
  deleteOrderService,
} = require("../services/order");

// dashboard all orders api
exports.allOrderCollectionController = async (req, res, next) => {
  try {
    const query = req.query;
    const { count, data } = await allOrderCollectionService(query)(query?.sort);
    res.append("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", `${count}`);
    res.json(data);
  } catch (err){
    console.log(err)
    next(error(500, "Internal server error"));
  }
};
// get all ordered product
exports.getOrderProductController = async (req, res, next) => {
  try {
    const orderData = req.body;
    const result = await getOrderProductService(orderData);
    // send order mail function
    if (result?.acknowledged) {
      sendPurchaseMailService(orderData);
    }
    res.json(result);
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// ordered single data api
exports.getSingleOrderController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getSingleOrderService(id);
    res.json(result);
  } catch {
    next(error(500, "Internal server error"));
  }
};

// shipping orders api
exports.shippingOrdersController = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await shippingOrdersService({
      id,
      order: { delivery: true },
    });
    res.json(result);
  } catch {
    next(error(500, "Internal server error"));
  }
};

// delete product api
exports.deleteOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteOrderService(id);
    res.json(result);
  } catch {
    next(error(500, "Internal server error"));
  }
};
