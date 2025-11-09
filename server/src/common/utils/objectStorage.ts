import fs from "fs";
import { writeFile, unlink, readFile } from "fs/promises";
// import { v4 as uuid4 } from "uuid";
import {
    bucketExists,
    deleteObject,
    downloadObject,
    makeBucket,
    objectExists,
    putObject,
} from "@/common/utils/minioClient";
import { ApiError } from "./ApiError";

export interface IObjectMetaData {
    name: string,
    count?: number,
    userId: string,
    fnPath?: string;
}


export const handleObjectStorage = async (filecontent: string, metadata: IObjectMetaData) => {

    const { name, count, userId } = metadata;

    const foldername = `./src/temp/${userId}`;

    if (!fs.existsSync(foldername)) {
        fs.mkdirSync(foldername, { recursive: true });
    }

    const filename = `${name}.js`;
    const filePath = foldername + `/${filename}`;
    const objectPath = `${userId}/${filename}`;
    try {
        // Stores file temporarily on disk
        await writeFile(filePath, filecontent, { encoding: "utf8" })


        // Puts Object in Minio Object Storage
        await putObject(objectPath, filePath)

        // Removed because we need to read temporary File for GET ops
        // .then(() => unlink(filePath)) // removes the temporary instance

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


export const getObjectStorage = async (metadata: IObjectMetaData) => {
    const { name, userId, fnPath } = metadata;

    const foldername = `./src/temp/${userId}`;

    const filename = `${name}.js`;
    const filePath = foldername + `/${filename}`;

    if (fs.existsSync(filePath)) {
        const tempFileContent = await readFile(filePath, { encoding: 'utf8' });
        return tempFileContent;
    }


    console.log('fn path on 80', fnPath)
    if (!fnPath) throw new ApiError(404, "Fn Path does not Exists"!);

    const checkStoredFile = await objectExists(fnPath);

    if (!checkStoredFile) throw new ApiError(404, 'Fn File does not exixts in storage!')

    await downloadObject(fnPath, filePath);

    if (fs.existsSync(filePath)) {
        const tempFileContent = await readFile(filePath, { encoding: 'utf8' });
        return tempFileContent;
    }
}