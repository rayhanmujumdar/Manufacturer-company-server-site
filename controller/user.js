const {
  findAllUserService,
  getAdminEmailService,
  userCollectionService,
  adminUpdateRoleService,
} = require("../services/user");
const error = require("../utilits/error");
const { jwtTokenGenerator } = require("../utilits/jwtTokenGenerator");

// find a all users controller
exports.findAllUserController = async (req, res, next) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded.email;
    if (email === decoded) {
      const result = (await findAllUserService()).reverse();
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// admin email get api controller
exports.getAdminEmailController = async (req, res, next) => {
  try {
    const email = req.params.email;
    const decoded = req.decoded.email;
    if (email === decoded) {
      const user = await getAdminEmailService(email);
      const isAdmin = user?.role === "admin";
      res.json({ admin: isAdmin });
    } else {
      next(error(403, "forbidden"));
    }
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// user collection api controller
exports.userCollectionController = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const result = await userCollectionService({ email, user });
    const token = jwtTokenGenerator(email);
    res.json({
      token,
      result,
    });
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// Make a admin api
exports.adminCreateController = async (req, res, next) => {
  try {
    const filterMail = req.params.email;
    const decoded = req.decoded.email;
    const userEmail = req.body.email;
    if (userEmail === decoded) {
      const result = await adminUpdateRoleService({
        email: filterMail,
        role: "admin",
      });
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};

// deleted admin api
exports.deleteAdminController = async (req, res, next) => {
  try {
    const filterMail = req.params.email;
    const authEmail = req.body.email;
    const decoded = req.decoded.email;
    if (authEmail === decoded) {
      const result = await adminUpdateRoleService({
        email: filterMail,
        role: null,
      });
      res.json(result);
    } else {
      next(error(403, "forbidden"));
    }
  } catch (err) {
    next(error(500, "Internal server error"));
  }
};
