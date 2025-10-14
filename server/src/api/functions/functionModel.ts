import pool from "@/common/data/db";
import { CreateFunctionType } from "@/common/schema/function";
import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import type { Request, Response } from "express";


export const createFunctionService = async (body: CreateFunctionType) => {

  try {
    const { runtime, fn_name, fn_zip_file, owner } = body;
    const createdFunction = await pool.query(`INSERT INTO functions(runtime, fn_name, fn_zip_file, owner) VALUES($1, $2, $3, $4) RETURNING *`, [runtime, fn_name, fn_zip_file, owner]);

    return createdFunction.rows[0];

  } catch (error) {

    console.log("in function service", error)

    throw new ApiError(500, "Error ocurred while creating function Service")
  }

}