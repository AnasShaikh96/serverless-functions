

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,  
    -- functions UUID[] NOT NULL,  
    -- usage UUID[] NOT NULL,      
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    refreshtoken TEXT NOT NULL,  
    -- CONSTRAINT fk_functions FOREIGN KEY (functions) REFERENCES functions(id) ON DELETE CASCADE,
    -- CONSTRAINT fk_usage FOREIGN KEY (usage) REFERENCES usage(id) ON DELETE CASCADE
);




-- CREATE TABLE
--   IF NOT EXISTS users (
--     user_id SERIAL PRIMARY KEY,
--     username VARCHAR(50) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(50) NOT NULL,
--     created_at TIMESTAMP NOT NULL,
--     updated_At TIMESTAMP NOT NULL,
--     refresh_token VARCHAR(255) NOT NULL,
--     PRIMARY KEY(user_id),
--     CONSTRAINT fk_functions
--       FOREIGN KEY (function_id)
--       REFERENCES functions(function_id)
--   )