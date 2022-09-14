const pool = require("../configs/db.config");

const role = async (id) => {
  const res = await pool.query(
    "SELECT name FROM user_roles_mapping as a LEFT JOIN roles as b ON a.role_id = b.id WHERE a.user_id = $1",
    [id]
  );

  console.log(res.rows[0].name);

  // Complete RBAC
};

module.exports = role;
