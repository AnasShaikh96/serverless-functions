

import pool from '../data/db'


export const createFunctionTable = async () => {
  try {

    const query = `
   CREATE EXTENSION IF NOT EXISTS pgcrypto;


  CREATE TABLE functions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
    runtime VARCHAR(255) NOT NULL,  
    fn_name VARCHAR(255) NOT NULL,  
    fn_zip_file BYTEA NOT NULL,     
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    update_count INT DEFAULT 0,     
    response_url TEXT,              
    owner UUID NOT NULL,            
    usage UUID NOT NULL,          
    CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_usage FOREIGN KEY (usage) REFERENCES usage(id) ON DELETE CASCADE
  );`
    await pool.query(query);
    console.log('table created successfully');


  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end()
  }
}