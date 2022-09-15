const router = require("express").Router();
const authorization = require("../middlewares/authorization.middleware");
const controller = require("../controllers/dashboard.controller");

router.get("/", authorization.authMiddle, controller.dashboard);

module.exports = router;
