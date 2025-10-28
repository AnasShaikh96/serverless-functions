// import { StatusCodes } from "http-status-codes";

// import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import pool from "@/common/data/db";
import { CreateUser, LoginUser, UpdateUser, User } from "@/common/schema/user";
import { ApiError } from "@/common/utils/ApiError";
import { sendResponse } from "@/common/utils/response";
import bcrypt from 'bcrypt'
// import { ServiceResponse } from "@/common/models/serviceResponse";

export const userService = new UserRepository();

// export const findAll = async (): Promise<ServiceResponse<User[] | null>> => {
//   try {
//     const users = await userService.findAllAsync();
//     if (!users || users.length === 0) {
//       return ServiceResponse.failure(
//         "No Users found",
//         null,
//         StatusCodes.NOT_FOUND
//       );
//     }
//     return ServiceResponse.success<User[]>("Users found", users);
//   } catch (ex) {
//     const errorMessage = `Error finding all users: $${(ex as Error).message}`;
//     // logger.error(errorMessage);
//     return ServiceResponse.failure(
//       "An error occurred while retrieving users.",
//       null,
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// };

// export const findById = async (
//   id: number
// ): Promise<ServiceResponse<User | null>> => {
//   try {
//     const user = await userService.findByIdAsync(id);
//     if (!user) {
//       return ServiceResponse.failure(
//         "User not found",
//         null,
//         StatusCodes.NOT_FOUND
//       );
//     }
//     return ServiceResponse.success<User>("User found", user);
//   } catch (ex) {
//     const errorMessage = `Error finding user with id ${id}:, ${
//       (ex as Error).message
//     }`;
//     return ServiceResponse.failure(
//       "An error occurred while finding user.",
//       null,
//       StatusCodes.INTERNAL_SERVER_ERROR
//     );
//   }
// };


// export const loginService = async (userData: LoginUser) => {

//   try {

//     const { email, password } = userData;

//     const querytext = await pool.query('SELECT * from users WHERE email=$1', [email]);

//     if (querytext.rowCount === 0) {
//       throw new Error('User does not exists');
//     }

//     const user = querytext.rows[0] as User;

//     const checkPassword = bcrypt.compare(password, user.password);

//     if (!checkPassword) {
//       throw new Error('Password is not valid');
//     }
//   } catch (error) {

//   }
// }

export const createUserService = async (body: CreateUser) => {
  try {
    const { name, email, password } = body;

    const hashedpassword = await bcrypt.hash(password, 10)
    const querytext = await pool.query(`INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, hashedpassword])

    return querytext.rows[0];
  } catch (error) {
    throw new ApiError(500, error?.detail ?? 'Could not create User', false)
  }
}


export const findByIdService = async (id: string) => {
  try {

    const querytext = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return querytext.rows[0];

  } catch (error) {
    throw new ApiError(500, error?.detail ?? 'Could not find user by Id', false)
  }
}


export const findAllService = async () => {
  try {

    const querytext = await pool.query(`SELECT * FROM users`);
    return querytext.rows;

  } catch (error) {
    throw new ApiError(500, error?.detail ?? 'Error occured while finding all users', false)
  }
}



export const updateByIdService = async (id: string, body: UpdateUser) => {
  try {
    const { name, email, password } = body;
    const hashedpassword = await bcrypt.hash(password, 10)
    const now = new Date();

    const querytext = await pool.query(`UPDATE users SET(name, email, password, updated_at) = ($1, $2, $3, $4) WHERE id=$5 RETURNING *`, [name, email, hashedpassword, now.toISOString(), id]);
    return querytext.rows[0];

  } catch (error) {
    console.log(error)
    throw new ApiError(500, error?.detail ?? 'Error occured updating user', false)
  }
}


export const deleteByIdService = async (id: string) => {
  try {

    const userExists = await findByIdService(id);

    if (!userExists?.id) {
      throw new ApiError(404, "User does not exists or already deleted!", false)
    }

    const querytext = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return querytext.rows[0];

  } catch (error) {
    console.log(error)
    throw new ApiError(500, error?.detail ?? 'Error occured while deleting user', false)
  }
}

