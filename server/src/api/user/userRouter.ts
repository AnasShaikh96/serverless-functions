import express, { type Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./userController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createUserSchema, updateUserSchema } from "@/common/schema/user";

export const userRouter: Router = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/create", validateRequest(createUserSchema), createUser);
userRouter.patch("/update", validateRequest(updateUserSchema), updateUser);
userRouter.delete("/delete/:id", deleteUser);