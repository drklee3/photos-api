import { ReadStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import amqp, { Channel } from 'amqp-connection-manager'
import { FileUpload } from 'graphql-upload'
import exif from 'exif-reader'
import sharp from 'sharp'
import type { Application } from 'express'
import { aggregatedS3 } from './s3'
import { ImageResizeJob, IMAGE_RESIZE_QUEUE_NAME } from '@picatch/shared'
import { getImageKey } from './image'
import { retryAsync } from 'ts-retry'
import { log } from '../utils/logger'

// AMQP
const amqpConn = amqp.connect(process.env.AMQP_ENDPOINT!)
amqpConn.on('connect', () => {
  log.info('amqp connected')
})

amqpConn.on('disconnect', (err) => {
  log.info('amqp disconnected', err)
})

export const channelWrapper = amqpConn.createChannel({
  name: IMAGE_RESIZE_QUEUE_NAME,
  json: true,
  setup: (channel: Channel) => {
    return Promise.all([
      channel.assertQueue(IMAGE_RESIZE_QUEUE_NAME, { durable: true }),
    ])
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

export async function uploadFile(file: Express.Multer.File) {
  const { buffer, mimetype, originalname } = file

  const id = uuidv4()

  // TODO: support video uploads
  const metadata = await sharp(buffer).metadata()

  // Parse raw exif buffer if exists
  const exifData = metadata.exif ? exif(metadata.exif) : {}

  const key = getImageKey(id, 'ORIGINAL')

  // Only upload original, resized images are generated and uploaded out of band.
  // Retry this max 5 times.
  const obj = await retryAsync(
    async () =>
      aggregatedS3.putObject({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentDisposition: originalname,
        ContentType: mimetype,
      }),
    { delay: 250, maxTry: 5 },
  )

  const { width, height, size } = metadata

  if (!width || !height || !size) {
    throw new Error('file output is invalid')
  }

  const job: ImageResizeJob = {
    id,
    filename: originalname,
    mimetype,
  }

  await channelWrapper.sendToQueue(IMAGE_RESIZE_QUEUE_NAME, job)

  return {
    filename: originalname,
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
