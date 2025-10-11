CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE usage_type AS ENUM ('Update', 'Get', 'Post');
CREATE TYPE log_status AS ENUM ('200', '400', '500');    

CREATE TABLE usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usage_type usage_type NOT NULL, 
    log_status log_status NOT NULL, 
    output TEXT NOT NULL,           
    execution_time INT NOT NULL,    
    times_used INT DEFAULT 0,       
    access_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    access_ips TEXT[],             
    user UUID NOT NULL,             
    function UUID NOT NULL,         
    CONSTRAINT fk_user FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_function FOREIGN KEY (function) REFERENCES functions(id) ON DELETE CASCADE
);



-- CREATE TYPE use_type AS ENUM ('get', 'post', 'put', 'delete', 'patch');

-- CREATE TABLE
--   IF NOT EXISTS usages (
--     usage_id SERIAL PRIMARY KEY,
--     usage_type use_type,
--     log_status TEXT NOT NULL,
--     output TEXT NOT NULL,
--     execution_time SMALLINT NOT NULL,
--     times_used BIGINT NOT NULL,
--     access_time TIMESTAMP NOT NULL,
--     access_ips VARCHAR(50) NOT NULL
--   )