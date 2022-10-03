const router = require("express").Router();
const controller = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization.middleware");

router.get(
  "/get-api-collections",
  authorization.authMiddle,
  controller.getAPICollection
);

router.get(
  "/user-info",
  authorization.authMiddle,
  controller.getUserInformation
);

module.exports = router;
