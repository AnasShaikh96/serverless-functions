import pool from "@/common/data/db";
import {
  CreateFunctionType,
  UpdateFunctionType,
} from "@/common/schema/function";
import { ApiError } from "@/common/utils/ApiError";

export const createFunctionService = async (body: CreateFunctionType) => {
  try {
    const { runtime, fn_name, owner } = body;
    const createdFunction = await pool.query(
      `INSERT INTO functions(runtime, fn_name, owner) VALUES($1, $2, $3) RETURNING *`,
      [runtime, fn_name, owner]
    );

    return createdFunction.rows[0];
  } catch (error) {
    console.log("in function service", error);

    throw new ApiError(500, "Error ocurred while creating function Service");
  }
};

export const getFunctionByIdService = async (functionId: string) => {
  try {
    const functionData = await pool.query(
      "SELECT * FROM functions WHERE id=$1",
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

export const updateFunctionByIdService = async (id: string, body: UpdateFunctionType) => {
  try {

    const { fn_name, fn_zip_file } = body;

    const functionData = await pool.query(`UPDATE functions SET(fn_name, fn_zip_file) = ($1,$2) WHERE id=$3 RETURNING *`, [fn_name, fn_zip_file, id]);

    return functionData.rows
  } catch (error) {
    console.log(error)
    throw new ApiError(500, error?.detail ?? "Error while updating function by Id");
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
