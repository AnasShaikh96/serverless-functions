import * as Minio from "minio";
import { config } from "./config";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: config.minio_accesskey,
  secretKey: config.minio_secretkey

  // accessKey: 'zeL4QaRXd7xvHsYVfU2v',
  // secretKey: 'LxbezIDEjR8vb8bTRdsxifDTZSePM82Mift7zO17',
  // Home laptop
  // accessKey: "YLzQSb0MSrqgtON5szAB",
  // secretKey: "4zJZN8WpWc52lBanEvhRuw82PmFqbYRka1re66qa",
});

var metaData = {
  "Content-Type": "text/plain",
  "X-Amz-Meta-Testing": 1234,
  example: 5678,
};

const bucket = config.bucket_name;

export const bucketExists = async () => {
  try {
    // const bucket = config.bucket_name;
    // const bucket = config.bucket_name + "/" + userPath + "/";
    // const exists = await minioClient.listObjectsV2(
    //   config.bucket_name,
    //   userPath,
    //   false
    // );

    // const exists = await minioClient.statObject(config.bucket_name, userPath);

    const exists = await minioClient.bucketExists(bucket);
    // const exists = await minioClient.statObject(config.bucket_name, userPath);
    console.log("inside the bkt exist func", exists);
    return exists;
  } catch (error) {
    // console.log("inside the bkt exist error", error);

    return false;
  }
};

export const objectExists = async (userPath: string) => {

  // const bucket = config.bucket_name;
  const objectexists = await minioClient.statObject(bucket, userPath).catch(err => {
    console.log(err);
    return false;
  });
  return objectexists;
}

export const makeBucket = async (userPath?: string) => {
  // const bucket = config.bucket_name + "/" + userPath + "/";

  try {

    // const bucket = config.bucket_name;
    const data = await minioClient.makeBucket(bucket);
    return data;
  } catch (error) {
    console.log(error)
  }
};

export const putObject = async (destination: string, sourceFile: string) => {

  try {


    // const bucket = config.bucket_name;
    const data = await minioClient.fPutObject(
      bucket,
      destination,
      sourceFile,
      metaData
    );

    return data;
  } catch (error) {
    throw Error(error ?? 'Error while adding object')
  }
};

export const deleteObject = async (userPath: string) => {

  try {
    const obj = minioClient.removeObject(bucket, userPath)
    return obj
  } catch (error) {
    throw Error(error ?? 'Error while deleting object');
  }
}