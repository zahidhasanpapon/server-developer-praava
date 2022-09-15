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

module.exports = { getAllRegisteredUsers };
