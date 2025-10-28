import type { Request, Response, NextFunction } from 'express'
import { config } from '../utils/config';
import { User } from '../schema/user';
import { ApiError } from '../utils/ApiError';
import jwt from 'jsonwebtoken'


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = req.cookies;
        jwt.verify(accessToken, config.jwt_secret, function (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: 'Auth Token Expired',
                })
            } else {
                (req as any).user = decoded
                next();
            }
        });

    } catch (error) {
        throw new ApiError(401, 'Invalid or Unauthorized Token');
    }
}

export const generateToken = (user: User) => {

    const accessToken = jwt.sign(user, config.jwt_secret, { expiresIn: '1d' });
    const refreshToken = jwt.sign(user, config.jwt_secret, { expiresIn: '1y' });

    return { accessToken, refreshToken }
}