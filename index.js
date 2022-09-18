const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { notFound } = require("./middlewares/error.middleware");

require("dotenv").config();

// const roles = require("./utils/getUserRoles.util");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/dashboard", require("./routes/dashboard.route"));
app.use("/admin", require("./routes/admin.route"));
// app.use("/api-collections", require("./routes/apiCollection.route"));

// const res = roles("3577ae90-12b8-435d-8d6c-d079159c748a");

app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on port ${port}`);
});
