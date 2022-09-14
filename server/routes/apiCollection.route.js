const router = require("express").Router();
const authorization = require("../middlewares/authorization.middleware");
const controller = require("../controllers/apiList.controller");

router.get("/", authorization.authMiddle, controller.getAllApiCollectionList);

module.exports = router;
