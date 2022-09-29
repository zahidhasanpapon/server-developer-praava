const router = require("express").Router();
const swaggerJsdDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("../docs/swaggerDef");

const specs = swaggerJsdDoc({
  swaggerDefinition,
  apis: ["../docs/*.yml", "../routes/*.js"],
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
