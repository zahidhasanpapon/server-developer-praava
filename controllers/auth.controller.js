const bcrypt = require("bcrypt");

const pool = require("../configs/db.config");
const jwtGenerator = require("../utils/generateToken.util");

/**
 *
 * @param {*} req | Register a new user
 * @param {*} res |
 * @returns
 */
const registerUser = async (req, res) => {
  // 1. Destructure the req.body {name, email, passowrd}.
  const { name, email, password } = req.body;

  try {
    // 2. Check if user exists (if exists throw error).
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    // 3. Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Insert the new user data inside database
    let newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // 5. Generate the JWT token for the user
    const token = jwtGenerator(newUser.rows[0].id);

    res.status(200).json({ token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  // 1. Destructure the req.body
  const { email, password } = req.body;

  try {
    // 2. Check if user doesn't exist (if not then we throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is Incorrect!");
    }

    // 3. Check if incoming password is the same as the database password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    // TODO: Refresh Token - Per request token

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect!");
    }

    // 4. Give them the JWT token
    const token = jwtGenerator(user.rows[0].id);

    res.json(token);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const authVerification = async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { registerUser, loginUser, authVerification };
