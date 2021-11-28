import { createWriteStream, ReadStream, unlink } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { S3 } from '@aws-sdk/client-s3'
import { URL } from 'url'
import { extname } from 'path'
import { FileUpload } from 'graphql-upload'
import exif from 'exif-reader'
import sharp from 'sharp'

export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

function streamToBuffer(stream: ReadStream): Promise<Buffer> {
  const chunks: Array<any> = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

export const uploadFile = async (file: FileUpload) => {
  const { createReadStream, filename, mimetype, encoding } = await file

  const id = uuidv4()

  const stream = createReadStream()
  const buf = await streamToBuffer(stream)

  // TODO: Save original file, generate and save webp, thumbnails, etc out of band
  // TODO: support video uploads
  const conversion = sharp().webp({ quality: 80 }).withMetadata()

  const metadata = await sharp(buf).metadata()

  // Parse raw exif buffer
  const exifData = exif(metadata.exif)

  const obj = await aggregatedS3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: id,
    Body: stream.pipe(conversion),
    ContentType: mimetype,
    ContentEncoding: encoding,
  })

  const { width, height, size } = metadata

  if (!width || !height || !size) {
    throw new Error('file output is invalid')
  }

  return {
    filename,
    id,
    data: obj,
    metadata: {
      width: width,
      height: height,
      size: size,
      exif: exifData,
    },
  }
}
