require("dotenv").config();
const jwt = require("jsonwebtoken");
const dbCollection = require("../db/dbCollection");
const error = require("../utilits/error");
// jwt verify token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(error(401, "unAuthorized"));
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(error(403, "forbidden"));
    }
    req.decoded = decoded;
    next();
  });
};

// verify admin or not
exports.verifyAdmin = async (req, res, next) => {
  const { userCollection } = await dbCollection();
  const requester = req?.decoded?.email;
  const requesterAccount = await userCollection.findOne({
    email: requester,
  });
  if (requesterAccount.role === "admin") {
    next();
  } else {
    next(error(403, "forbidden"));
  }
};
