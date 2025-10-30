import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwt_secret: process.env.JWT_SECRET ?? "",
  db_host: process?.env?.HOST ?? "",
  db_user: process?.env?.DB_USER ?? "",
  db_name: process?.env?.DATABASE_NAME ?? "",
  db_port: process?.env?.DB_PORT ?? 3000,
  db_password: process?.env?.DB_PASSWORD ?? "",
  cookieOptions: {
    httpOnly: true,
    // secure only in production; localhost over http needs false
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  },
  bucket_name: "serverless-bucket",
  cors_origin: process?.env?.CORS_ORIGIN ?? "http://localhost:5174",
  minio_accesskey: process.env.MINIO_ACCESSKEY ?? 'YLzQSb0MSrqgtON5szAB',
  minio_secretkey: process.env.MINIO_SECRETKEY ?? '4zJZN8WpWc52lBanEvhRuw82PmFqbYRka1re66qa'
};
