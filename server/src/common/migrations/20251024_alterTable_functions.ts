import pool from "../data/db";

export const alterFunctionTable = async () => {
  try {
    const query = `
  ALTER TABLE functions
  ADD CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
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
