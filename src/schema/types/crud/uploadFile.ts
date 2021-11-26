import { createWriteStream, unlink } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { S3 } from '@aws-sdk/client-s3'
import { URL } from 'url'
import { extname } from 'path'
import { FileUpload } from 'graphql-upload'

export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

export const uploadFile = async (file: FileUpload) => {
  const { createReadStream, filename, mimetype, encoding } = await file

  const id = uuidv4()

  const obj = await aggregatedS3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: id,
    Body: createReadStream,
    ContentType: mimetype,
    ContentEncoding: encoding,
  })

  return {
    filename,
    id,
    data: obj,
  }
}
