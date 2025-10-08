import { extractArchive } from "@/common/utils/extractArchieve";
import type { Request, Response } from "express";
import fs from "fs";
import { User } from "../user/userModel";
import { StatusCodes } from "http-status-codes";

const dummyId = "82e5e5f7-fdd7-4b21-8573-cb00cbd9b336";

const checkUserFunctionBucket = async (id: string) => {
  const userExits = await fetch(`http://localhost:3000/user-bucket/${id}`);
  return userExits;
};

const storeFunctionBucket = async (id: string, file: string) => {
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
};

export const createFunctionHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    // Now I dont have concepts of directory cause I'm managing a machine with user details
    // technically, a User bucket should be initiated at the Sign Up function itself, but we'll still add a check as of now.

    const userBucket = await checkUserFunctionBucket(id);

    // console.log(userBucket.status);

    if (userBucket.status === StatusCodes.OK) {
    } else {
      throw new Error("No Function Bucket found");
    }
    // const userDir = `./src/executable-funcs`;
    // const createDir = `./src/executable-funcs/${dummyId}`;

    // if (!fs.existsSync(createDir)) {
    //   fs.mkdirSync(createDir);
    // }

    // const pathUrl = await extractArchive(
    //   "../helloDynamic.js.zip",
    //   createDir,
    //   "helloDynamic.js"
    // );

    const storedFunctionPath = await storeFunctionBucket(
      id,
      "../helloDynamic.js.zip"
    );

    if (storedFunctionPath.status === StatusCodes.OK) {
      const getUrl = await storedFunctionPath.json();
      console.log("storedFunctionPath", getUrl);

      res.status(200).json({
        message: "Testing funcs",
        storedFunctionPath: getUrl.functionUrl,
        // pathUrl: `http://${req.host}/generatedfunction${pathUrl?.replace(
        //   userDir,
        //   ""
        // )}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
