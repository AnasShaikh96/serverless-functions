import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import type { Request, Response } from "express";
import {
  createFunctionService,
  deleteFunctionByIdService,
  getAllFunctionsService,
  getFunctionByIdService,
  updateFunctionByIdService,
} from "./functionModel";
import { CreateFunctionType, GetFunctionType } from "@/common/schema/function";
import pool from "@/common/data/db";
import { User } from "@/common/schema/user";
import { getObjectStorage, handleObjectStorage } from "@/common/utils/objectStorage";

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

    const body = req.body as CreateFunctionType;

    // Function would be created first then we add storage.
    const data = await createFunctionService({ ...body })
    sendResponse(res, 200, "Function created successfully!", data);
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

    const userId = req.user.id
    const fnId = req.params.id; // get fn id from req params;s
    const functionData: GetFunctionType = await getFunctionByIdService(fnId);

    // check for temporary file
    // if it exists in memory, read and send it
    // if not, then download it in the temp storage from MinIO
    // then read it and forward its content
    const fileData = await getObjectStorage({
      userId,
      name: functionData.fn_name,
      fnPath: functionData.fn_zip_file
    });

    sendResponse(res, 200, "Fetched Data Successfully", {
      ...functionData,
      fn_zip_file: fileData
    });
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

    const userId = req.user.id
    const fnId = req.params.id

    const body = req.body

    const getfn = await getFunctionByIdService(fnId);

    // Updating object storage by name and userId to maintain a single file.
    const objectStorage = await handleObjectStorage(body.fn_zip_file, {
      name: getfn.fn_name,
      userId
    })

    const updatefn = await updateFunctionByIdService(fnId, {
      fn_name: getfn.fn_name,
      fn_zip_file: objectStorage
    })


    sendResponse(res, 200, "Updated Data Successfully", updatefn);
  }
);

export const deleteFunctionHandler = catchAsync(
  async (req: Request, res: Response) => {
    const fnId = dummyFnId;

    const deleteFnData = await deleteFunctionByIdService(fnId);
    sendResponse(res, 200, "Deleted Function", deleteFnData);
  }
);
