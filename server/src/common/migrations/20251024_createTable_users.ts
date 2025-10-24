

import pool from '../data/db'


export const createUserTable = async () => {
  try {

    const query = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,  
    functions UUID[] NOT NULL,  
    usage UUID[] NOT NULL,      
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    refreshtoken TEXT NOT NULL,  
    CONSTRAINT fk_functions FOREIGN KEY (functions) REFERENCES functions(id) ON DELETE CASCADE,
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