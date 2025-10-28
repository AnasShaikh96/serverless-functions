import express, { type Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, loginUser } from "./userController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createUserSchema, loginUserSchema, updateUserSchema } from "@/common/schema/user";
import { verifyToken } from "@/common/middleware/authToken";

export const userRouter: Router = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", verifyToken, getUser);
userRouter.post("/create", validateRequest(createUserSchema), createUser);
userRouter.patch("/update", validateRequest(updateUserSchema), updateUser);
userRouter.delete("/delete/:id", deleteUser);

userRouter.post("/login", validateRequest(loginUserSchema), loginUser);

