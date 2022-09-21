const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();

const { notFound } = require("./middlewares/error.middleware");

// const roles = require("./utils/getUserRoles.util");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Documentation - Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Praava Developer Documentation",
      version: "1.0.0",
      descriptio: "Here we get all the documentations",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/dashboard", require("./routes/dashboard.route"));
app.use("/admin", require("./routes/admin.route"));
// app.use("/api-collections", require("./routes/apiCollection.route"));

// const res = roles("3577ae90-12b8-435d-8d6c-d079159c748a");

app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
