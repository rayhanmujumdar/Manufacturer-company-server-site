const express = require("express");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("tools found");
// });

// router.post("/", (req, res) => {
//   res.send("tools found");
// });

// shortcut
router
  .route("/")
  /**
   * @api {get} /tools All tools
   * @apiDescription get all the tools
   * @apiPermission admin
   * 
   * @apiHeader {String} Authorization user's access token
   * 
   * @apiParam
   * @apiParam
   * 
   * @apiSuccess
   * 
   * @apiError (Unauthorize 401) unauthorize only authorize users can access the data  
   * @apiError (Forbidden 403)   only admin can access the data
   */
  .get((req, res) => {
    res.send("tools found")
  })
  /**
   * @api {post} /tools save a tools
   * @apiDescription post all the tools
   * @apiPermission admin
   * 
   * @apiHeader {String} Authorization user's access token
   * 
   * @apiParam
   * @apiParam
   * 
   * @apiSuccess
   * 
   * @apiError (Unauthorize 401) unauthorize only authorize users can access the data  
   * @apiError (Forbidden 403)   only admin can access the data
   */
  .post((req, res) => {
    res.send('tools found')
  });

module.exports = router;
