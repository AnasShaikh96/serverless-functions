import dotenv from 'dotenv';
dotenv.config()

export const config = {
    jwt_secret: process.env.JWT_SECRET ?? ''
}