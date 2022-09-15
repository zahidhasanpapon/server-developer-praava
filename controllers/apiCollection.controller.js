const pool = require("../configs/db.config");

const getAllApiCollectionList = async (req, res) => {
  console.log(req.user);
  try {
    // const user = await pool.query(
    //   "SELECT name FROM api_collection WHERE id = $1",
    //   [req.user]
    // );
    const apiList = await pool.query("SELECT * FROM api_collection");
    console.log(apiList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { getAllApiCollectionList };
