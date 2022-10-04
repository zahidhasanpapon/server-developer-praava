const router = require("express").Router();
const controller = require("../controllers/admin.controller");
const authorization = require("../middlewares/authorization.middleware");

router.put(
  "/activate-api-collection",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.activateAPICollection
);

router.put(
  "/delete-api-collection",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.deleteAPICollection
);

router.get(
  "/user-details",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.getUserDetails
);

router.put(
  "/activate-role",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.activateRole
);

router.put(
  "/delete-role",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.deleteRole
);

router.get(
  "/get-roles",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.getAllRoles
);

router.put(
  "/activate-user",
  authorization.authMiddle,
  authorization.adminOnly,
  controller.activateUser
);

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
