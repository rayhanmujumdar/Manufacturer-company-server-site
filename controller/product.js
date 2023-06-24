const error = require("../utilits/error");
const {
  getAllProductService,
  newProductService,
  updateProductService,
  singleProductService,
  deleteProductService,
} = require("../services/product");

// get all product controller
exports.getAllProductController = async (req, res, next) => {
  try {
    const query = req.query;
    const { product, count } = await getAllProductService(query)(query?.sort);
    res.append("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", `${count}`);
    res.json(product);
  } catch {
    next(error(500, "Internal server error"));
  }
};

// Add a new Product api
exports.newProductController = async (req, res,next) => {
  try {
    const newProduct = req.body;
    const email = req.query.email;
    const decoded = req.decoded.email;
    if (email === decoded) {
      const result = await newProductService(newProduct);
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch {
    next(error(500, "Internal server error"));
  }
};

// manage product api
exports.manageProductController = async (req, res, next) => {
  try {
    const query = req.query;
    const email = req.query.email;
    const decoded = req.decoded.email;
    if (email === decoded) {
      const { count, product } = await getAllProductService(query)(query?.sort);
      res.append("Access-Control-Expose-Headers", "X-Total-Count");
      res.setHeader("X-Total-Count", `${count}`);
      res.json(product);
    } else {
      next(error(500, "forbidden"));
    }
  } catch {
    next(error(500, "Internal server error"));
  }
};

// update product api
exports.updateProductController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.query.email;
    const decoded = req.decoded.email;
    const product = req.body;
    if (email === decoded) {
      const result = await updateProductService({
        id,
        product: { ...product, createAt: Date.now() },
      });
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch {
    next(error(500, "Internal server error"));
  }
};

// find a single product api controller
exports.singleProductController = async (req, res,next) => {
  try {
    const decoded = req?.decoded?.email;
    const email = req?.query?.email;
    const id = req.params.id;
    if (email === decoded) {
      const result = await singleProductService(id);
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch {
    next(error(500, "Internal server error"));
  }
};

// update quantity controller
exports.getUpdateQuantityController = async (req, res,next) => {
  try {
    const id = req.params.id;
    const availableQuantity = req.body;
    const result = await updateProductService({
      id,
      product: availableQuantity,
    });
    res.json(result);
  } catch {
    next(error(500, "Internal server error"));
  }
};

// delete product api
exports.deleteProductController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteProductService(id);
    res.json(result);
  } catch {
    next(error(500, "Internal server error"));
  }
};
