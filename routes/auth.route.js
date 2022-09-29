const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const validation = require("../middlewares/validInfo.middleware");
const authorization = require("../middlewares/authorization.middleware");

router.post("/register", validation.validationMiddle, controller.registerUser);
router.post("/login", validation.validationMiddle, controller.loginUser);
router.get("/verify", authorization.authMiddle, controller.authVerification);

module.exports = router;
