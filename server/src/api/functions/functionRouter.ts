import type { Request, Response, Router } from "express";

import express from "express";
import {
  createFunctionHandler,
  createFunctionTable,
  deleteFunctionHandler,
  getAllFunctionHandler,
  getFunctionHandler,
  updateFunctionHandler,
} from "./functionController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createFunctionSchema } from "@/common/schema/function";

const functionRouter: Router = express.Router();


functionRouter.get('/create-table', createFunctionTable)
functionRouter.post("/create",  createFunctionHandler);
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
