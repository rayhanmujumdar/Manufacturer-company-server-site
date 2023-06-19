const dbCollection = require("../db/dbCollection");
const jwt = require("jsonwebtoken");

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

// Make a admin api
exports.adminCreateController = async (req, res) => {
  const { userCollection } = await dbCollection();
  const makeAdminEmail = req.params.email;
  const decoded = req.decoded.email;
  const email = req.body.email;
  if (email === decoded) {
    const filter = { email: makeAdminEmail };
    const updateDoc = {
      $set: { role: "admin" },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
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
    console.log(result)
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};
