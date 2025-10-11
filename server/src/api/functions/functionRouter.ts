import type { Request, Response, Router } from "express";

import express from "express";
import {
  createFunctionHandler,
  deleteFunctionHandler,
  getAllFunctionHandler,
  getFunctionHandler,
  updateFunctionHandler,
} from "./functionController";

const functionRouter: Router = express.Router();

functionRouter.post("/create", createFunctionHandler);
// node version
// zip file
// fn name
// trigger method: REST API
// REQ type doesnt matter, I have to spew output regardless

functionRouter.get("/get/:id", getFunctionHandler);
functionRouter.get("/getall", getAllFunctionHandler);
functionRouter.patch("/update", updateFunctionHandler);
functionRouter.delete("/delete", deleteFunctionHandler);

export default functionRouter;
