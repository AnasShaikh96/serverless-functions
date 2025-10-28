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
    -- usage UUID NOT NULL,          
    CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE,
    -- CONSTRAINT fk_usage FOREIGN KEY (usage) REFERENCES usage(id) ON DELETE CASCADE
);



-- CREATE TABLE
--   IF NOT EXISTS functions (
--     function_id SERIAL PRIMARY KEY,
--     fn_name VARCHAR(255) UNIQUE NOT NULL,
--     runtime VARCHAR(50) NOT NULL,
--     fn_zip TEXT UNIQUE NOT NULL,
--     created_at TIMESTAMP NOT NULL,
--     updated_at TIMESTAMP NOT NULL,
--     update_count SERIAL response_url TEXT UNIQUE NOT NULL,
--     PRIMARY KEY (function_id),
--     CONSTRAINT fk_owner 
--       FOREIGN KEY (user_id)
--       REFERENCES users(user_id) 
--   )