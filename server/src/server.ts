import cors from "cors";
import express, { type Express } from "express";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import { env } from "@/common/utils/envConfig";
import functionRouter from "./api/functions/functionRouter";

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

app.use("/hey", (req, res) => {
  res.send("Check health");
});

app.use(errorHandler());

export { app };
