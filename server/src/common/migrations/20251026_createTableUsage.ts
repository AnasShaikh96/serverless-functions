import pool from "../data/db";

export const createUsageTable = async () => {
  try {
    const query = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usage_type TEXT NOT NULL, 
    log_status log_status NOT NULL, 
    output TEXT NOT NULL,           
    execution_time INT NOT NULL,    
    times_used INT DEFAULT 0,       
    access_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    access_ips TEXT[],             
    owner UUID NOT NULL,             
    function UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_function FOREIGN KEY (function) REFERENCES functions(id) ON DELETE CASCADE);`;
    await pool.query(query);
    console.log("table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    pool.end();
  }
};
