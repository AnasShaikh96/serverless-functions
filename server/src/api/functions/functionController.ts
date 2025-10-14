import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createFunctionService } from "./functionModel";
import { CreateFunctionType } from "@/common/schema/function";
import pool from "@/common/data/db";



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

  const userId = "b8a56b43-f7e0-44cf-bbfa-0edc9c0cbba7"  //req.user.id as string considering we'll be taking logged in users id  ;
  const body = req.body as CreateFunctionType

  // check user bucket exists
  const userBucket = await checkUserFunctionBucket(userId)
  console.log("userId", userBucket.status === StatusCodes.OK)

  if (userBucket.status === StatusCodes.OK) {

    const functionData = await createFunctionService(body)
    sendResponse(res, 200, "Function created successfully!", functionData)

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
    const id = req.params.id;

    // db operation

    sendResponse(res, 200, "Fetched Data Successfully", {
      succes: true,
    });
  }
);

export const getAllFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // db operation

    sendResponse(res, 200, "Fetched All Functions Successfully", {
      succes: true,
    });
  }
);

export const updateFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // db operation

    sendResponse(res, 200, "Updated Data Successfully", {
      succes: true,
    });
  }
);

export const deleteFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    // db operation

    sendResponse(res, 200, "Deleted Function", {
      succes: true,
    });
  }
);
