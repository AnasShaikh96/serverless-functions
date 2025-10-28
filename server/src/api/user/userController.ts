import type { Request, RequestHandler, Response } from "express";

import { createUserService, findAllService, findByIdService, updateByIdService, deleteByIdService, findByEmailService } from "@/api/user/userService";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import { UpdateUser, User } from "@/common/schema/user";
import { ApiError } from "@/common/utils/ApiError";
import bcrypt from 'bcrypt'
import { generateToken } from "@/common/middleware/authToken";
import { config } from "@/common/utils/config";

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


export const loginUser = catchAsync(async (req: Request, res: Response) => {

	const { email, password } = req.body;

	const user: User = await findByEmailService(email);

	if (!user?.id) {
		throw new ApiError(404, "User with email does not exists");
	}

	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		throw new ApiError(401, "Invalid password");
	}

	const { accessToken, refreshToken } = generateToken(user);


	res.status(200)
		.cookie('accessToken', accessToken, config.cookieOptions)
		.cookie('refreshToken', refreshToken, config.cookieOptions)
		.json({
			status: 200,
			message: 'User Logged in Successfully!',
			data: user,
			accessToken,
			refreshToken
		})
})

