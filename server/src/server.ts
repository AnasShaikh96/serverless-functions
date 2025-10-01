import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import fs from 'fs'
import path from "path";


const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter);

// Request logging
// app.use(requestLogger);

// Routes
// app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);


app.use('/somedynamicroute', async (req, res) => {
    const intededDir = './src/excutable-funcs'
    if (!fs.existsSync(intededDir)) {
        fs.mkdirSync(intededDir)
    } else {
        const moduel = await import(`./excutable-funcs/index`)
        if (moduel['helloWorld']) {
            moduel['helloWorld']();
        }
    }
    res.send("hello")

})



app.use('/generatedfunction/:id', async (req, res) => {

    const reqMethod = req;

    switch (reqMethod.method) {
        case "GET":
            const moduel = await import(`./excutable-funcs/index`)
            await moduel.default['helloWorld'](res)
        default:
            res.status(200).json({
                message: 'Invalid method'
            })
    }
})

// console.log("my directory name", __dirname)

// Swagger UI
// app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
