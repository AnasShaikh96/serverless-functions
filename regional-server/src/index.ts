import express from "express";
import cors from "cors";
import bucketRouter from "./routes/bucketRoutes.ts";
import invocationRouter from "./routes/invocationRoutes.ts";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/bucket", bucketRouter);
app.use("/invocation", invocationRouter);

app.listen(port, () => {
  console.log(`server up at ${port}`);
});
