import pool from "../data/db";

export const AlterUsageTable = async () => {
  try {
    const query = `
  ALTER TABLE usage
  ADD CONSTRAINT fk_user FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_function FOREIGN KEY (function) REFERENCES functions(id) ON DELETE CASCADE;
`;
    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
