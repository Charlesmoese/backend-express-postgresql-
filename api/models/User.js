import { DataTypes } from "sequelize";
import { sequelize } from "../database/configdb.js";
import { pool } from "../database/configdb.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const createUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
  `;
  const values = [username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByUsernameOrEmail = async (username, email) => {
  const query = `
    SELECT * FROM users
    WHERE username = $1 OR email = $2;
  `;
  const values = [username, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllUsers = async () => {
  const query = `
    SELECT id, username, email FROM users;
  `;
  const result = await pool.query(query);
  return result.rows;
};

export { createUser, findUserByUsernameOrEmail, getAllUsers };
export default User;