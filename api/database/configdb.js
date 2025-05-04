import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


const connect = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected");

    // Criar tabela automaticamente
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;
    await client.query(createTableQuery);
    console.log("Table 'users' ensured to exist");
    client.release();
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
  }
};

export { pool, connect };