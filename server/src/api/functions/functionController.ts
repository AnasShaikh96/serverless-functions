import { ApiError } from "@/common/utils/ApiError";
import { catchAsync } from "@/common/utils/catchAsync";
import { sendResponse } from "@/common/utils/response";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createFunctionService,
  deleteFunctionByIdService,
  getAllFunctionsService,
  getFunctionByIdService,
} from "./functionModel";
import { CreateFunctionType } from "@/common/schema/function";
import pool from "@/common/data/db";
import { User } from "@/common/schema/user";
import fs from "fs";
import { writeFile } from "fs/promises";
import { v4 as uuid4 } from "uuid";
import {
  bucketExists,
  makeBucket,
  putObject,
} from "@/common/utils/minioClient";

const dummyId = "a1d6b9a1-fc0a-43ab-81f6-d3c930b9a22c";
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

    const foldername = `./src/temp/${userId}`;

    if (!fs.existsSync(foldername)) {
      fs.mkdirSync(foldername, { recursive: true });
    }

    const filename = "d98a0220-5255-4a24-a958-e7e0a78972f5_index.js"; //`${uuid4()}_index.js`;
    const filePath = foldername + `/${filename}`;

    const userbktExists = await bucketExists(userId);

    console.log(userbktExists);

    // if (!userbktExists) {
    // await makeBucket(userId);

    // }

    await putObject(`${userId}/${filename}`, filePath);

    console.log("userbktExists", userbktExists);

    // writeFile(filePath, body.fn_zip_file, { encoding: "utf8" })
    //   .then(() => {
    //     // if()
    //     // console.log("written file ", res);
    //     // throw Error("Nakli error");
    //   })
    //   .catch((err) => {
    //     console.log("err while writefil");
    //     // fs.unlink(filePath, (err) => {
    //     //   if (err) {
    //     //     console.log("err while unlinking file");
    //     //   } else {
    //     //     console.log("corrupt file removed successfully!");
    //     //   }
    //     // });
    //   });

    // try {
    //   writeFile(filePath, body.fn_zip_file, (err) => {
    //     if (err) {
    //       console.error("Error writing file:", err);
    //       throw Error("Error while writing file");
    //     } else {
    //       throw Error("Nakli error");

    //       console.log(`${filename} created successfully!`);
    //     }
    //   });
    // } catch (error) {
    //   fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.log("err while unlinking file");
    //     } else {
    //       console.log("corrupt file removed successfully!");
    //     }
    //   });
    // }

    sendResponse(res, 200, "ok func");

    // // check user bucket exists
    // const userBucket = await checkUserFunctionBucket(userId);
    // console.log(userBucket);

    // // if (userBucket.status === StatusCodes.OK) {

    // const storedUrl = await storeFunctionBucket(
    //   userId,
    //   "../../../../helloDynamic.js.zip",
    //   body.runtime
    // );

    // console.log("storedUrl", storedUrl);

    // if (storedUrl.status === StatusCodes.OK) {
    //   const resUrl = await storedUrl.json();
    //   const functionData = await createFunctionService({
    //     ...body,
    //     response_url: resUrl.functionUrl,
    //   });
    //   sendResponse(res, 200, "Function created successfully!", functionData);
    // } else {
    //   throw new ApiError(500, "An Error occurred while storing the file");
    // }

    // } else {
    //   throw new ApiError(500, "An error ocurred while creating function, User Bucket does not exists!");
    // }
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
    const userId = dummyId;
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
