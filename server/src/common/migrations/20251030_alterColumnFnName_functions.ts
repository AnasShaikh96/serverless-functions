import pool from "../data/db";

export const AlterColumnFnName = async () => {
  try {
    const query = `
  ALTER TABLE functions
  ADD CONSTRAINT constraint_name UNIQUE (fn_name),
  ALTER COLUMN fn_zip_file DROP NOT NULL;
  `;
    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
