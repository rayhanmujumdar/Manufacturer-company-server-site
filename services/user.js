const dbCollection = require("../db/dbCollection");
exports.findAllUserService = async () => {
  const { userCollection } = await dbCollection();
  return userCollection.find({}).toArray();
};

exports.getAdminEmailService = async (email) => {
  const { userCollection } = await dbCollection();
  return userCollection.findOne({ email });
};

exports.userCollectionService = async ({ email, user }) => {
  const { userCollection } = await dbCollection();
  const filter = {
    email: email,
  };
  const updateDoc = {
    $set: user,
  };
  const options = {
    upsert: true,
  };
  return userCollection.updateOne(filter, updateDoc, options);
};

exports.adminUpdateRoleService = async ({email,role}) => {
  const { userCollection } = await dbCollection();
  const filter = { email: email };
  const updateDoc = {
    $set: { role: role },
  };
  return userCollection.updateOne(filter, updateDoc);
};
