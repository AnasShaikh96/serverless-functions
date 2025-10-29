import * as Minio from "minio";
import { config } from "./config";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  // accessKey: 'zeL4QaRXd7xvHsYVfU2v',
  // secretKey: 'LxbezIDEjR8vb8bTRdsxifDTZSePM82Mift7zO17',
  // Home laptop
  accessKey: "YLzQSb0MSrqgtON5szAB",
  secretKey: "4zJZN8WpWc52lBanEvhRuw82PmFqbYRka1re66qa",
});

var metaData = {
  "Content-Type": "text/plain",
  "X-Amz-Meta-Testing": 1234,
  example: 5678,
};

export const bucketExists = async (userPath: string) => {
  try {
    const bucket = config.bucket_name + "/" + userPath;
    const exists = await minioClient.bucketExists(bucket);
    return exists;
  } catch (error) {
    return false;
  }
};

export const makeBucket = async (userPath: string) => {
  const bucket = config.bucket_name + "/" + userPath +"/";
  // const bucket = config.bucket_name;
  const data = await minioClient.makeBucket(bucket,"mumbai");
  return data;
};

export const putObject = async (destination: string, sourceFile: string) => {
  const bucket = config.bucket_name;

  const data = await minioClient.fPutObject(
    bucket,
    destination,
    sourceFile,
    metaData
  );

  return data;
};
