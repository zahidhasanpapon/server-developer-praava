const express = require("express");
require("dotenv").config();

const app = express();

// Routes
app.use("/test", require("./routes/test.route"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
