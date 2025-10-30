import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import type { Request, Response } from "express";
import {
  createFunctionService,
  deleteFunctionByIdService,
  getAllFunctionsService,
  getFunctionByIdService,
} from "./functionModel";
import { CreateFunctionType } from "@/common/schema/function";
import pool from "@/common/data/db";
import { User } from "@/common/schema/user";
import { handleObjectStorage } from "@/common/utils/objectStorage";

// const dummyId = "a1d6b9a1-fc0a-43ab-81f6-d3c930b9a22c";
const dummyFnId = "b1439dce-0ae6-4ae3-b78d-07027a3728e0";

const checkUserFunctionBucket = async (id: string) => {
  const userExits = await fetch(
    `http://localhost:1001/api/v1/bucket/user-bucket/${id}`
  );
  return userExits;
};

const storeFunctionBucket = async (
  id: string,
  file: string,
  runtime: string
) => {
  try {
    const storeFunction = await fetch(
      `http://localhost:1001/api/v1/bucket/store-function`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: file,
          id: id,
          version: runtime,
        }),
      }
    );

    return storeFunction;
  } catch (error) {
    throw new Error("Could not fetch User Bucket!");
  }
};





export const createFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId: User["id"] = req.user.id; //req.user.id as string considering we'll be taking logged in users id  ;
    const body = req.body as CreateFunctionType;

    const storedObject = await handleObjectStorage(userId, body.fn_zip_file)
    console.log("storedObject", storedObject)

    // const funcData = await createFunctionService({
    //   ...body,
    //   fn_zip_file: storedObject
    // })

    sendResponse(res, 200, "ok func");
  }
);

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
    const fnId = dummyFnId; // get fn id from req params;s
    const functionData = await getFunctionByIdService(fnId);
    sendResponse(res, 200, "Fetched Data Successfully", functionData);
  }
);

export const getAllFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const allFunctionData = await getAllFunctionsService(userId);
    sendResponse(
      res,
      200,
      "Fetched All Functions Successfully",
      allFunctionData
    );
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
