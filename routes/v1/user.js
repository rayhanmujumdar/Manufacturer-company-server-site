const router = require("express").Router();
const {
  userCollectionController,
  findAllUserController,
  getAdminEmailController,
  adminCreateController,
  deleteAdminController,
} = require("../../controller/user");
const {
  verifyAdmin,
  verifyToken,
} = require("../../middleware/custom.middleware");

// * user and admin api
// find all user api
router.get("/", verifyToken, findAllUserController);
// admin email get api
//TODO: previous path -> /admin/:email : now path is -> user/admin/:email
router.get("/admin/:email", verifyToken, getAdminEmailController);
// user collection api
router.put("/:email", userCollectionController);
// Make a admin api
router.put("/admin/:email", verifyToken, verifyAdmin, adminCreateController);
// update and add new admin route
// TODO: previous path -> /deleteAdmin/:email
router.put(
  "/admin/change/:email",
  verifyToken,
  verifyAdmin,
  deleteAdminController
);

module.exports = router;
