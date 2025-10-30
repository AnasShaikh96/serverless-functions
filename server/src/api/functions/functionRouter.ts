import type { Request, Response, Router } from "express";

import express from "express";
import {
  createFunctionHandler,
  deleteFunctionHandler,
  getAllFunctionHandler,
  getFunctionHandler,
  updateFunctionHandler,
} from "./functionController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createFunctionSchema } from "@/common/schema/function";
import { verifyToken } from "@/common/middleware/authToken";
import { verifyObjectStorage } from "@/common/middleware/objectBucketHanlder";

const functionRouter: Router = express.Router();


// functionRouter.get('/create-table', createFunctionTable)
functionRouter.post("/create", verifyToken, validateRequest(createFunctionSchema),verifyObjectStorage,  createFunctionHandler);
// node version
// zip file
// fn name
// trigger method: REST API
// REQ type doesnt matter, I have to spew output regardless

functionRouter.get("/get/:id", verifyToken, getFunctionHandler);
functionRouter.get("/getall", verifyToken, getAllFunctionHandler);
functionRouter.patch("/update", verifyToken, updateFunctionHandler);
functionRouter.delete("/delete/:id", verifyToken, deleteFunctionHandler);

export default functionRouter;
