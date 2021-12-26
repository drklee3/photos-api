import { createWriteStream, ReadStream, unlink } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { S3 } from '@aws-sdk/client-s3'
import { Queue } from 'bullmq'
import { URL } from 'url'
import path, { extname } from 'path'
import { FileUpload } from 'graphql-upload'
import exif from 'exif-reader'
import sharp from 'sharp'
import { NewPhotosQueue, NEW_PHOTOS_QUEUE } from '../../worker/queues'
import type { Application, Express } from 'express'
import { ImageResizeJob } from '../../worker/model/imageResizeJob'

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

export const uploadFile = async (file: FileUpload, app: Application) => {
  const { createReadStream, filename, mimetype, encoding } = file

  const extension = path.extname(filename)
  if (!extension) {
    throw new Error('invalid file extension')
  }

  const id = uuidv4()

  // TODO: support video uploads
  const stream = createReadStream()
  const buf = await streamToBuffer(stream)

  const metadata = await sharp(buf).metadata()

  // Parse raw exif buffer
  const exifData = exif(metadata.exif)

  // Only upload original, resized images are generated and uploaded out of band
  const obj = await aggregatedS3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: id + extension,
    Body: buf,
    ContentDisposition: filename,
    ContentType: mimetype,
    ContentEncoding: encoding,
  })

  const { width, height, size } = metadata

  if (!width || !height || !size) {
    throw new Error('file output is invalid')
  }

  const queue: Queue<ImageResizeJob> = app.get(NEW_PHOTOS_QUEUE)
  await queue.add('resize images', {
    id,
    filename,
    mimetype,
  })

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
