
import type { Request, Response, NextFunction } from 'express'
import { sendResponse } from './response';
import { ZodType } from 'zod';

export const validateBody = (schema: ZodType<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const value = schema.safeParse({ body: req.body });

        if (value.error) {
            sendResponse(res, 404, 'Zod Error in Validate.ts', value.error.flatten().fieldErrors.body)
        } else if (value.success) {
            req.body = value.data.body;
            next()
        }
    }
}

export const validateParams = (schema: ZodType<any>) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const value = schema.safeParse({ body: req.params });

        if (value.error) {
            sendResponse(res, 404, 'Zod Error in Validate.ts', value.error.flatten().fieldErrors.body)
        } else if (value.success) {
            req.params = value.data.body;
            next()
        }
    }
}


