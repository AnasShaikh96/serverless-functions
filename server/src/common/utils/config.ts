import dotenv from 'dotenv';
dotenv.config()

export const config = {
    jwt_secret: process.env.JWT_SECRET ?? '',
    db_host: process?.env?.HOST ?? '',
    db_user: process?.env?.DB_USER ?? '',
    db_name: process?.env?.DATABASE_NAME ?? '',
    db_port: process?.env?.DB_PORT ?? 3000,
    db_password: process?.env?.DB_PASSWORD ?? '',
}