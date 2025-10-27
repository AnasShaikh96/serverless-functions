// import { StatusCodes } from "http-status-codes";

// import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import pool from "@/common/data/db";
import { CreateUser, LoginUser, UpdateUser, User } from "@/common/schema/user";
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

    const hashedpassword = bcrypt.hash(password, 10)
    const querytext = await pool.query(`INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, hashedpassword])

    return querytext.rows[0];
  } catch (error) {
    throw new Error('Could not create User', error.message)
  }
}


export const findByIdService = async (id: string) => {
  try {

    const querytext = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return querytext.rows[0];

  } catch (error) {
    throw new Error('Could not find user by Id', error.message)
  }
}


export const findAllService = async (id: string) => {
  try {

    const querytext = await pool.query(`SELECT * FROM users`);
    return querytext.rows[0];

  } catch (error) {
    throw new Error('Error occured while finding all users', error.message)
  }
}



export const updateByIdService = async (id: string, body: UpdateUser) => {
  try {
    const { name, email, password } = body;
    const hashedpassword = bcrypt.hash(password, 10)

    const querytext = await pool.query(`UPDATE users SET(name, email, password) = ($1, $2, $3) WHERE id=$4 RETURNING *`, [name, email, hashedpassword, id]);
    return querytext.rows[0];

  } catch (error) {
    throw new Error('Error occured updating user', error.message)
  }
}


export const deleteByIdService = async (id: string) => {
  try {

    const userExists = await findByIdService(id);

    if (userExists.length === 0) {
      throw new Error('User already deleted!');
    }

    const querytext = await pool.query(`SELECT FROM users WHERE id=$1`, [id]);
    return querytext.rows[0];

  } catch (error) {
    throw new Error('Error occured while deleting user', error.message)
  }
}

