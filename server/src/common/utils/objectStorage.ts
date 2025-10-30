import fs, { existsSync } from "fs";
import { writeFile, unlink } from "fs/promises";
import { v4 as uuid4 } from "uuid";
import {
    bucketExists,
    deleteObject,
    makeBucket,
    objectExists,
    putObject,
  } from "@/common/utils/minioClient";
import { ApiError } from "./ApiError";

export const handleObjectStorage = async (userId: string, filecontent: string) => {
    const foldername = `./src/temp/${userId}`;

    if (!fs.existsSync(foldername)) {
        fs.mkdirSync(foldername, { recursive: true });
    }

    const filename = `${uuid4()}_index.js`;
    const filePath = foldername + `/${filename}`;
    const objectPath = `${userId}/${filename}`;
    try {
        // Stores file temporarily on disk
        await writeFile(filePath, filecontent, { encoding: "utf8" })


        // Puts Object in Minio Object Storage
        await putObject(objectPath, filePath)
            .then(() => unlink(filePath)) // removes the temporary instance

        return objectPath;

    } catch (error) {

        // Cleanup temporary file if error 
        if (fs.existsSync(filePath)) {
            unlink(filePath)
        }

        // Cleanup object file if error 
        const objexists = await objectExists(objectPath);
        if (objexists !== undefined) {
            await deleteObject(objectPath);
        }

        throw new ApiError(500, 'Internal Server Error: Error occurred while writing file.')
    }
}