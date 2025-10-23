import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'zeL4QaRXd7xvHsYVfU2v',
    secretKey: 'LxbezIDEjR8vb8bTRdsxifDTZSePM82Mift7zO17',
})

// File to upload
const sourceFile = './my-test-file.txt'

const bucket = 'js-test2-bucket'

// Destination object name
const destinationObject = 'my-test-file.txt'

// Check if the bucket exists
// If it doesn't, create it
const exists = await minioClient.bucketExists(bucket)


if (exists) {
    console.log('Bucket ' + bucket + ' exists.')
    // Set the object metadata
    var metaData = {
        'Content-Type': 'text/plain',
        'X-Amz-Meta-Testing': 1234,
        example: 5678,
    }

    // Upload the file with fPutObject
    // If an object with the same name exists,
    // it is updated with new data
    await minioClient.fPutObject(bucket, destinationObject, sourceFile, metaData)
    console.log('File ' + sourceFile + ' uploaded as object ' + destinationObject + ' in bucket ' + bucket)
} else {
    await minioClient.makeBucket(bucket, 'us-east-1')
    console.log('Bucket ' + bucket + ' created in "us-east-1".')
}

