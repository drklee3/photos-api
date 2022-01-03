import { ReadStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Queue } from 'bullmq'
import { FileUpload } from 'graphql-upload'
import exif from 'exif-reader'
import sharp from 'sharp'
import type { Application } from 'express'
import { aggregatedS3 } from './s3'
import { getImageKey } from './image'

function streamToBuffer(stream: ReadStream): Promise<Buffer> {
  const chunks: Array<any> = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

export const uploadFile = async (
  file: Promise<FileUpload>,
  app: Application,
) => {
  const { createReadStream, filename, mimetype, encoding } = await file

  const id = uuidv4()

  // TODO: support video uploads
  const stream = createReadStream()
  const buf = await streamToBuffer(stream)

  const metadata = await sharp(buf).metadata()

  // Parse raw exif buffer if exists
  const exifData = metadata.exif ? exif(metadata.exif) : {}

  const key = getImageKey(id, 'ORIGINAL')

  // Only upload original, resized images are generated and uploaded out of band
  const obj = await aggregatedS3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: buf,
    ContentDisposition: filename,
    ContentType: mimetype,
    ContentEncoding: encoding,
  })

  const { width, height, size } = metadata

  if (!width || !height || !size) {
    throw new Error('file output is invalid')
  }

  // TODO: Add to RabbitMQ queue

  return {
    filename,
    id,
    data: obj,
    metadata: {
      width: width,
      height: height,
      size: size,
      exif: exifData,
      mimetype: mimetype,
    },
  }
}
