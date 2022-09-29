const jwt = require("jsonwebtoken");
const pool = require("../configs/db.config");
const logger = require("../configs/logger.config");
require("dotenv").config();

const authMiddle = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_ACCESS);

    req.user = payload.user;
    next();
  } catch (err) {
    logger.error(err.message);
    return res.status(403).json("Not Authorized!");
  }
};

/**
 * TODO: Findout why req.headers.authorization is not working
 */
const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.statrsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

      req.user = decode.user;
      next();
    }
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("NOT Authorized, token failed");
  }
};

const adminOnly = async (req, res, next) => {
  try {
    const id = req.user;
    let role = await pool.query(
      "SELECT name FROM roles LEFT JOIN user_roles_mapping ON roles.id = user_roles_mapping.role_id WHERE user_id = $1",
      [id]
    );
    role = role.rows[0].name;
    if (role === "ADMIN") {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  } catch (err) {
    logger.error(err.message);
    return res.status(403).json("Not Authorized as an Admin");
  }
};

module.exports = { authMiddle, adminOnly, authorize };
