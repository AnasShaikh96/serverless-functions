import cors from "cors";
import express, { type Express } from "express";
import { userRouter } from "@/api/user/userRouter";
import functionRouter from "./api/functions/functionRouter";
import pool from "./common/data/db";
import { errorHandler } from "./common/utils/ApiError";
import cookieParser from 'cookie-parser'
// import { dropAllTable } from "./common/migrations/20251024_dropAll_table";
// import { createUserTable } from "./common/migrations/20251026_createTableUsers";
// import { createFunctionTable } from "./common/migrations/20251026_createTableFunctions";
// import { createUsageTable } from "./common/migrations/20251026_createTableUsage";
import { config } from "./common/utils/config";
// import { AlterColumnFnName } from "./common/migrations/20251030_alterColumnFnName_functions";
// import { AlterColumnFnFileZip } from "./common/migrations/20251030_alterColumnFnFileZip_functions";
// import { AlterColumnFnNameConstrainst } from "./common/migrations/20251105_alterColumnFnName_functions";

// const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.cors_origin, credentials: true,
  // origin: "http://localhost:5173",
  // credentials: true,
}));

app.use(cookieParser())

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/functions", functionRouter);

app.use("/hey", async (req, res) => {
  const poolDeets = await pool.query("SELECT current_database()");
  console.log("pool details", poolDeets.rows[0]);

  // Add table migrations query here and hit this route.

  // await AlterColumnFnNameConstrainst()

  res.send(`Check health ${poolDeets} `);
});

app.use(errorHandler);

export { app };
