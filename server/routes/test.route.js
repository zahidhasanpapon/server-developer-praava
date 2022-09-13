const router = require("express").Router();
const pool = require("../configs/db.config");

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT name, email FROM users;");

  res.json({
    result: result.rows[0],
  });
});

module.exports = router;
