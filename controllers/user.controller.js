const httpStatus = require("http-status");
const pool = require("../configs/db.config");
const logger = require("../configs/logger.config");

const getAPICollection = async (req, res) => {
  try {
    const id = req.user;
    const collections = await pool.query(
      "select name from api_collection as a inner join role_api_collection_mapping as b on a.id = b.api_collection_id inner join role_api_collection_mapping as c on b.role_id = c.role_id inner join user_roles_mapping as d on c.role_id = d.role_id where d.user_id = $1",
      [id]
    );

    res.status(200).json(collections.rows);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getUserInformation = async (req, res) => {
  try {
    const id = req.user;
    const query = "SELECT name, email FROM users WHERE id = $1";
    const infromation = await pool.query(query, [id]);

    res.status(200).json(infromation.rows[0]);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAPICollection,
  getUserInformation,
};
