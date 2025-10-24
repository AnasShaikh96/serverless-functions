import { Pool } from "pg";
import { config } from "../utils/config";

const pool = new Pool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name,
  port: Number(config.db_port),
  idleTimeoutMillis: 30000,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("Connection with Pool Established");
});

export default pool;
