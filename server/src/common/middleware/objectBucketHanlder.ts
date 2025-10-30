import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { bucketExists, makeBucket } from "../utils/minioClient";



export const verifyObjectStorage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const checkBkt = await bucketExists();
        if (!checkBkt) {
            await makeBucket();
        }
        next()
    } catch (error) {
        throw new ApiError(500, "Internal Server Error: Object Storage")
    }
}
