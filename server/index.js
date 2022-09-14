const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const roles = require("./utils/getUserRoles.util");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
// app.use("/auth", require("./routes/auth.route"));
// app.use("/dashboard", require("./routes/dashboard.route"));
// app.use("/api-collections", require("./routes/apiCollection.route"))

const res = roles("3577ae90-12b8-435d-8d6c-d079159c748a");

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
