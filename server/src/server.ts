import cors from "cors";
import express, { type Express } from "express";
import { userRouter } from "@/api/user/userRouter";
// import errorHandler from "@/common/middleware/errorHandler";
import { env } from "@/common/utils/envConfig";
import functionRouter from "./api/functions/functionRouter";
import pool from "./common/data/db";
import { errorHandler } from "./common/utils/ApiError";

import { createFunctionTable } from "./common/migrations/20251026_createTableFunctions";
import { createUsageTable } from "./common/migrations/20251026_createTableUsage";
import { createUserTable } from "./common/migrations/20251026_createTableUsers";
import { alterFunctionTable } from "./common/migrations/20251024_alterTable_functions";
import { AlterUsageTable } from "./common/migrations/20251024_alterTable_usage";
import { AlterUserTable } from "./common/migrations/20251024_alterTable_users";
import { AlterColumnUsers } from "./common/migrations/20251024_alterColumnFunction_users";
import { dropAllTable } from "./common/migrations/20251024_dropAll_table";

// const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/functions", functionRouter);

app.use("/hey", async (req, res) => {
  const poolDeets = await pool.query("SELECT current_database()");
  console.log("pool details", poolDeets.rows[0]);

  // await createUserTable();
  // await createFunctionTable();
  // await createUsageTable();

  // await dropAllTable();

  res.send(`Check health ${poolDeets} `);
});

app.use(errorHandler);

export { app };
