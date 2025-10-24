import pool from "../data/db";

export const AlterUserTable = async () => {
  try {
    const query = `
  ALTER TABLE users
  ADD CONSTRAINT fk_functions FOREIGN KEY (functions) REFERENCES functions(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_usage FOREIGN KEY (usage) REFERENCES usage(id) ON DELETE CASCADE;
`;
    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
