const pool = require("../configs/db.config");
const logger = require("../configs/logger.config");

const getAllRegisteredUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT id, name, email, status FROM users"
    );

    logger.error(`sent all users: ${allUsers}`);
    res.json(allUsers.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

const createNewRole = async (req, res) => {
  try {
    const roleName = body.name;
    const roleDescription = req.body.description;

    const createRole = await pool.query(
      "INSERT INTO roles (name, details) VALUES ($1, $2)",
      [roleName, roleDescription]
    );

    res.json(createRole.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

const createApiCollection = async (req, res) => {
  try {
    const collectionName = req.body.name;

    const createCollection = await pool.query(
      "INSERT INTO api_collection (name) VALUES($1)",
      [collectionName]
    );

    res.json(createCollection.rows[0]);
  } catch (err) {
    logger.error(err);
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
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

const userRoleMapping = async (req, res) => {
  try {
    const userId = req.body.user;
    const roleId = req.body.role;

    const createUserRoleMapping = await pool.query(
      "INSERT INTO user_roles_mapping (user_id, role_id) VALUES ($1, $2)",
      [userId, roleId]
    );

    res.json(createUserRoleMapping.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

const roleApiCollectionMapping = async (req, res) => {
  try {
    const roleId = req.body.role;
    const apiCollectionId = req.body.apiCollectionId;

    const creatRoleAPIColletion = await pool.query(
      "INSERT INTO role_api_collection_mapping (role_id, api_collection_id) VALUES ($1, $2)",
      [roleId, apiCollectionId]
    );

    res.status(200).json({ msg: "Created" });
  } catch (err) {
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllRegisteredUsers,
  createNewRole,
  createApiCollection,
  createApiEndpoint,
  userRoleMapping,
  roleApiCollectionMapping,
};
