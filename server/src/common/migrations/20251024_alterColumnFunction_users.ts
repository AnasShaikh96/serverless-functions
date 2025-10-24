import pool from "../data/db";

export const AlterColumnUsers = async () => {
  try {
    const query = `
  ALTER TABLE users
  ALTER COLUMN functions TYPE UUID USING (functions[1]),
  ALTER COLUMN usage TYPE UUID USING (usage[1]);
  `;
    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
