import express from "express";
import cors from "cors";
import bucketRouter from "./routes/bucketRoutes";
import invocationRouter from "./routes/invocationRoutes";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/v1/bucket", bucketRouter);
app.use("/api/v1/invocation", invocationRouter);

app.listen(port, () => {
  console.log(`server up at ${port}`);
});
