import type { Request, Response, Router } from "express";

import express from "express";
import { createFunctionHandler } from "./functionController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { GetUserSchema } from "../user/userModel";

const functionRouter: Router = express.Router();

functionRouter.post(
  "/create/:id",
//   validateRequest(GetUserSchema),
  createFunctionHandler
);



export default functionRouter