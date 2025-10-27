import pool from "@/common/data/db";
import {
  CreateFunctionType,
  UpdateFunctionType,
} from "@/common/schema/function";
import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import type { Request, Response } from "express";

export const createFunctionService = async (body: CreateFunctionType) => {
  try {
    const { runtime, fn_name, fn_zip_file, owner, response_url } = body;
    const createdFunction = await pool.query(
      `INSERT INTO functions(runtime, fn_name, fn_zip_file, owner, response_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [runtime, fn_name, fn_zip_file, owner, response_url]
    );

    return createdFunction.rows[0];
  } catch (error) {
    console.log("in function service", error);

    throw new ApiError(500, "Error ocurred while creating function Service");
  }
};

export const getFunctionByIdService = async (functionId: string) => {
  try {
    // const functionData = await pool.query(`SELECT * FROM functions WHERE id='${functionId}'`)
    const functionData = await pool.query(
      "SELECT * FROM functions WHERE id=$1::uuid",
      [functionId]
    );
    return functionData.rows[0];
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while fetching function by ID.");
  }
};

export const getAllFunctionsService = async (userId: string) => {
  try {
    const functionsData = await pool.query(
      `SELECT * FROM functions WHERE owner=$1::uuid`,
      [userId]
    );
    // const functionsData = await pool.query(`SELECT * FROM functions`);
    return functionsData.rows;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while fetching all functions");
  }
};

export const updateFunctionByIdService = async (body: UpdateFunctionType) => {
  try {
    const functionData = await pool.query(``);
  } catch (error) {
    throw new ApiError(500, "Error while updating function by Id");
  }
};

export const deleteFunctionByIdService = async (functionId: string) => {
  try {
    const functionData = await pool.query(
      `DELETE FROM functions WHERE id=$1 RETURNING *`,
      [functionId]
    );
    return functionData.rows[0];
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while fetching function by ID.");
  }
};
