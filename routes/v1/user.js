const router = require("express").Router();
const {
  userCollectionController,
  findAllUserController,
  getAdminEmailController,
  adminCreateController,
  deleteAdminController,
} = require("../../controller/controller");
const {
  verifyAdmin,
  verifyToken,
} = require("../../middleware/custom.middleware");

// * user and admin api
// user collection api
router.put("/:email", verifyToken, userCollectionController);
// find all user api
router.get("/", verifyToken, findAllUserController);
// admin email get api
router.get("/admin/:email", verifyToken, getAdminEmailController);
// Make a admin api
router.put("/admin/:email", verifyToken, verifyAdmin, adminCreateController);
// update and add new admin admin api
// TODO: previous path -> /deleteAdmin/:email
router.put("/admin/:email", verifyToken, verifyAdmin, deleteAdminController);

module.exports = router;
