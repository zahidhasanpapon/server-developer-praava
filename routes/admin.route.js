const router = require("express").Router();
const controller = require("../controllers/admin.controller");
const validation = require("../middlewares/validInfo.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.get(
  "/get-users",
  authorization.authMiddle,

  controller.getAllRegisteredUsers
);

module.exports = router;
