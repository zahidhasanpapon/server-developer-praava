const router = require("express").Router();
const controller = require("../controllers/admin.controller");
const authorization = require("../middlewares/authorization.middleware");

router.get(
  "/get-users",
  authorization.authMiddle,
  // authorization.authorize,
  authorization.adminOnly,
  controller.getAllRegisteredUsers
);

router.post(
  "/create-role",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.createNewRole
);

router.post(
  "/create-api-collection",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.createApiCollection
);

router.post(
  "/create-api-endpoint",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.createApiEndpoint
);

router.post(
  "/user-role-mapping",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.userRoleMapping
);

module.exports = router;
