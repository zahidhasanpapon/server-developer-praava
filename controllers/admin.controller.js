const httpStatus = require("http-status");
const pool = require("../configs/db.config");
const logger = require("../configs/logger.config");

const getAllRegisteredUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT id, name, email, status FROM users"
    );

    // logger.error(`sent all users: ${allUsers}`);
    res.json(allUsers.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

const deleteUsers = async (req, res) => {
  try {
    const user_id = req.body.userid;
    const query = "UPDATE users SET status = false WHERE id = $1";
    const deleteUser = await pool.query(query, [user_id]);
    res.status(201).json({ message: "User successfully deleted" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user_id = req.body.userid;
    const query = "SELECT name, email FROM users WHERE id = $1";
    const details = await pool.query(query, [user_id]);

    res.status(200).json(details.rows);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const activateUser = async (req, res) => {
  try {
    const user_id = req.body.userid;
    const query = "UPDATE users SET status = true WHERE id = $1";
    const activate = await pool.query(query, [user_id]);

    res.status(201).json({ message: "User successfully activated" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const query = "SELECT * FROM roles";
    const roles = await pool.query(query);

    res.status(200).json(roles.rows);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const activateRole = async (req, res) => {
  try {
    const role_id = req.body.roleid;
    const query = "UPDATE roles SET status = true WHERE id = $1";
    const acitvate = await pool.query(query, [role_id]);

    res.status(201).json({ message: "Role succesfully activated" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const deleteRole = async (req, res) => {
  try {
    const role_id = req.body.roleid;
    const query = "UPDATE roles SET status = false WHERE id = $1";
    const deleteRole = await pool.query(query, [role_id]);

    res.status(201).json({ message: "Role successfully deleted" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const deleteAPICollection = async (req, res) => {
  try {
    const collection_id = req.body.collectionid;
    const query = "UPDATE api_collection SET status = false WHERE id = $1";
    const deleteCollection = await pool.query(query, [collection_id]);

    res.status(201).json({ message: "Successfully deleted API Collection" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
  }
};

const activateAPICollection = async (req, res) => {
  try {
    const collection_id = req.body.collectionid;
    // console.log(collection_id);
    const query = "UPDATE api_collection SET status = true WHERE id = $1";
    const activateCollection = await pool.query(query, [collection_id]);
    // activateCollection;
    res.status(201).json({ message: "Successfully Activated API Collection" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).send(httpStatus["500_NAME"]);
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

    res.status(201).json({ message: "Succefully created new role" });
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
    const apiCollectionId = req.body.apiCollection;

    const creatRoleAPIColletion = await pool.query(
      "INSERT INTO role_api_collection_mapping (role_id, api_collection_id) VALUES ($1, $2)",
      [roleId, apiCollectionId]
    );

    res.status(200).json({ msg: "Successfully created the relation" });
  } catch (err) {
    logger.error(err);
    res.status(500).send("Server Error");
  }
};

const getAPICollection = async (req, res) => {
  try {
    const query = "SELECT * from api_collection";
    const getCollection = await pool.query(query);

    res.status(200).json(getCollection.rows);
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatus[500]).send(httpStatus["500_MESSAGE"]);
  }
};

module.exports = {
  getAllRegisteredUsers,
  createNewRole,
  createApiCollection,
  createApiEndpoint,
  userRoleMapping,
  roleApiCollectionMapping,
  deleteUsers,
  getAPICollection,
  deleteAPICollection,
  activateUser,
  getAllRoles,
  deleteRole,
  activateRole,
  getUserDetails,
  activateAPICollection,
};
