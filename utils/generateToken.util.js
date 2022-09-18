const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_ACCESS, { expiresIn: "1d" });
};

module.exports = generateToken;
