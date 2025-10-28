import type { Request, Response, NextFunction } from 'express'
// import { DrizzleQueryError } from 'drizzle-orm';

class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(
        statusCode: number,
        message: string,
        isOperational: boolean = true,
        stack: string = ''
    ) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}



export class AppError extends Error {
    statusCode: number
    code?: string
    constructor(message: string, statusCode = 500, code?: string) {
        super(message)
        this.statusCode = statusCode
        if (code !== undefined) this.code = code
    }
}

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const isAppError = err instanceof ApiError
    const status = isAppError ? err.statusCode : 500
    const message = isAppError ? err.message : 'Something went wrong!'

    console.log('inside the error module', isAppError, err)

    //   const details = err instanceof DrizzleQueryError ? err?.cause?.detail ?? 'Something went wrong!' : undefined
    const details = 'Something went wrong!'
    res.status(status).json({
        status,
        message,
        ...(details ? { details } : {}),
    })

}


export { ApiError };
