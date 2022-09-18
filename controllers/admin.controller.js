const pool = require("../configs/db.config");

const getAllRegisteredUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT id, name, email, status FROM users"
    );

    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createNewRole = async (req, res) => {
  try {
    const roleName = req.body.name;
    const roleDescription = req.body.description;

    const createRole = await pool.query(
      "INSERT INTO roles (name, details) VALUES ($1, $2)",
      [roleName, roleDescription]
    );

    res.json(createRole.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const createApiCollection = async (req, res) => {
  try {
    const collectionName = req.body.name;
    // console.log(collectionName);

    const createCollection = await pool.query(
      "INSERT INTO api_collection (name) VALUES($1)",
      [collectionName]
    );

    res.json(createCollection.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const createApiEndpoint = async (req, res) => {
  try {
    const endPointName = req.body.name;
    const collectionName = req.body.collection;

    const createEndpoint = await pool.query(
      "INSERT INTO api_endpoint (name, api_collection_id) VALUES ($1, $2)",
      [endPointName, collectionName]
    );

    res.json(createEndpoint.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllRegisteredUsers,
  createNewRole,
  createApiCollection,
  createApiEndpoint,
};
