require("dotenv").config();
const jwt = require('jsonwebtoken')
const dbCollection = require("../db/dbCollection");
// jwt verify token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      massage: "Unauthorized",
    });
  }
  // console.log(authHeader)
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "forbidden",
      });
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
    res.status(403).send({ message: "forbidden" });
  }
};
