require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const docsRoute = require("./routes/docs.route");
const logger = require("./configs/logger.config");
const morganMiddleware = require("./middlewares/morgan.middleware");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const devRoutes = [
  {
    path: "/docs",
    route: docsRoute,
  },
];

if (process.env.NODE_ENV === "developemnt") {
  devRoutes.forEach((route) => {
    app.use(route.path, route.route);
  });
}

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/dashboard", require("./routes/dashboard.route"));
app.use("/admin", require("./routes/admin.route"));
app.use("/user", require("./routes/user.route"));

// send back a 404 error for any unknown api request
app.use(notFound);

// handle error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
