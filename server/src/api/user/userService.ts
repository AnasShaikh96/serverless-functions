import pool from "@/common/data/db";
import { CreateUser, UpdateUser } from "@/common/schema/user";
import { ApiError } from "@/common/utils/ApiError";
import bcrypt from 'bcrypt'

export const findByEmailService = async (email: string) => {
  try {
    const querytext = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return querytext.rows[0];
  } catch (error) {
    throw new ApiError(500, error?.detail ?? 'User with email does not exists', false)
  }
}

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

