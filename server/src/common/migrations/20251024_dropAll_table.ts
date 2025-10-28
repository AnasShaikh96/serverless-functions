import pool from "../data/db";

export const dropAllTable = async () => {
  try {
    const query = `
    DROP TABLE IF EXISTS functions, users, usage CASCADE;`;

    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
