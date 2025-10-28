import type { Request, RequestHandler, Response } from "express";

import { createUserService, findAllService, findByIdService, updateByIdService, deleteByIdService } from "@/api/user/userService";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import { UpdateUser } from "@/common/schema/user";

// class UserController {
// 	public getUsers: RequestHandler = async (_req: Request, res: Response) => {
// 		const serviceResponse = await findAll();
// 		res.status(serviceResponse.statusCode).send(serviceResponse);
// 	};

// 	public getUser: RequestHandler = async (req: Request, res: Response) => {
// 		const id = Number.parseInt(req.params.id as string, 10);
// 		const serviceResponse = await findById(id);
// 		res.status(serviceResponse.statusCode).send(serviceResponse);
// 	};
// }

// export const userController = new UserController();



export const getUsers = catchAsync(async (req: Request, res: Response) => {
	const serviceResponse = await findAllService();
	sendResponse(res, 200, 'Users fetched successfully!', serviceResponse);
})

export const getUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id
	const serviceResponse = await findByIdService(id);
	sendResponse(res, 200, 'User fetched successfully!', serviceResponse);
})

export const createUser = catchAsync(async (req: Request, res: Response) => {
	const body = req.body;
	const serviceResponse = await createUserService(body);
	sendResponse(res, 201, 'User created successfully!', serviceResponse);
})

export const updateUser = catchAsync(async (req: Request, res: Response) => {
	const body = req.body as UpdateUser;
	const serviceResponse = await updateByIdService(body.id, body);
	sendResponse(res, 201, 'User updated successfully!', serviceResponse);
})


export const deleteUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const serviceResponse = await deleteByIdService(id);
	sendResponse(res, 201, 'User deleted!', serviceResponse);
})

