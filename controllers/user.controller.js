const pool = require("../configs/db.config");

const getAllApiCollection = async (req, res) => {
  try {
    const collections = await pool.query(
      "select name from api_collection as a inner join role_api_collection_mapping as b on a.id = b.api_collection_id inner join role_api_collection_mapping as c on b.role_id = c.role_id inner join user_roles_mapping as d on c.role_id = d.role_id where d.user_id = $1",
      [req.user]
    );

    req.json(collections.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
