import pool from "../data/db";

export const AlterColumnFnFileZip = async () => {
  try {
    const query = `
  ALTER TABLE functions
  ALTER COLUMN fn_zip_file TYPE TEXT;
  `;
    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
