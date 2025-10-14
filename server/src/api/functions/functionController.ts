import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createFunctionService, deleteFunctionByIdService, getAllFunctionsService, getFunctionByIdService } from "./functionModel";
import { CreateFunctionType } from "@/common/schema/function";
import pool from "@/common/data/db";





// export const createFunctionTable = async () => {
//   try {

//     const query = `
//     CREATE EXTENSION IF NOT EXISTS pgcrypto;

//     CREATE TABLE IF NOT EXISTS usages (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     usage_type VARCHAR(50) NOT NULL, 
//     log_status VARCHAR(50) NOT NULL,
//     output TEXT NOT NULL,    
//     execution_time INT NOT NULL,
//     times_used INT DEFAULT 0,       
//     access_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     access_ips TEXT[],            
//     user_id UUID NOT NULL,
//     function UUID NOT NULL,
//     CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
//     CONSTRAINT fk_function FOREIGN KEY(function) REFERENCES functions(id) ON DELETE CASCADE
// );`
//     await pool.query(query);
//     console.log('table created successfully');


//   } catch (error) {
//     console.error('Error creating table:', error);
//   } finally {
//     pool.end()
//   }
// }

const dummyId = "a1d6b9a1-fc0a-43ab-81f6-d3c930b9a22c";
const dummyFnId = "b1439dce-0ae6-4ae3-b78d-07027a3728e0"


const checkUserFunctionBucket = async (id: string) => {
  const userExits = await fetch(`http://localhost:3000/user-bucket/${id}`);
  return userExits;
};

const storeFunctionBucket = async (id: string, file: string) => {
  try {
    const storeFunction = await fetch(
      `http://localhost:3000/store-function/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl: file }),
      }
    );

    return storeFunction;
  } catch (error) {
    throw new Error("Could not fetch User Bucket!")
  }
};


export const createFunctionHandler = catchAsync(async (req: Request, res: Response) => {

  const userId = dummyId  //req.user.id as string considering we'll be taking logged in users id  ;
  const body = req.body as CreateFunctionType

  // check user bucket exists
  const userBucket = await checkUserFunctionBucket(userId)

  if (userBucket.status === StatusCodes.OK) {

    const storedUrl = await storeFunctionBucket(userId, '../../../../helloDynamic.js.zip');

    if (storedUrl.status === StatusCodes.OK) {

      const resUrl = await storedUrl.json()
      const functionData = await createFunctionService({ ...body, response_url: resUrl.functionUrl })
      sendResponse(res, 200, "Function created successfully!", functionData)

    } else {
      throw new ApiError(500, 'An Error occurred while storing the file')
    }

  } else {
    throw new ApiError(500, "An error ocurred while creating function")
  }

})


// export const createFunctionHandler = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id as string;
//     const userBucket = await checkUserFunctionBucket(id);

//     if (userBucket.status === StatusCodes.OK) {
//       const createdBucket = await storeFunctionBucket("aaa", "aaaa");

//       res.status(200).json({
//         message: "Function created Successfully!",
//         url: "//",
//         createdBucket,
//       });
//     } else {
//       throw new Error("Bucket already exists");
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

export const getFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {

    const fnId = dummyFnId // get fn id from req params;s
    const functionData = await getFunctionByIdService(fnId);
    sendResponse(res, 200, "Fetched Data Successfully", functionData);
  }
);

export const getAllFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = dummyId;
    const allFunctionData = await getAllFunctionsService(userId);
    sendResponse(res, 200, "Fetched All Functions Successfully", allFunctionData);
  }
);

export const updateFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    sendResponse(res, 200, "Updated Data Successfully", {
      succes: true,
    });
  }
);

export const deleteFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const fnId = dummyFnId;

    const deleteFnData = await deleteFunctionByIdService(fnId);
    sendResponse(res, 200, "Deleted Function", deleteFnData);
  }
);
