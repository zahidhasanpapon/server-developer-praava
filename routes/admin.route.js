const router = require("express").Router();
const controller = require("../controllers/admin.controller");
const authorization = require("../middlewares/authorization.middleware");

router.get(
  "/get-api-collections",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.getAPICollection
);

router.put(
  "/delete-user",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.deleteUsers
);

router.get(
  "/get-users",
  authorization.authMiddle,
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

router.post(
  "/role-api-mapping",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.roleApiCollectionMapping
);

module.exports = router;
