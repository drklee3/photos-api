import { SandboxedJob, Job } from 'bullmq'
import { S3 } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { Readable } from 'stream'
import { encode } from 'blurhash'
import { PrismaClient } from '.prisma/client'
import { ImageResizeJob } from './model/imageResizeJob'
import { getImageKey, PhotoSizeEnum, sizeToWidth } from '../store/image'

export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

const prisma = new PrismaClient()

console.log('test')

function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Array<any> = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

const IMG_SIZES: PhotoSizeEnum[] = ['LARGE', 'MEDIUM', 'SMALL', 'THUMBNAIL']

module.exports = async (job: SandboxedJob<ImageResizeJob>) => {
  console.log('worker process: got new job:', job)
  const { id, filename, mimetype } = job.data

  // Get original image
  const img = await aggregatedS3.getObject({
    Bucket: process.env.S3_BUCKET,
    Key: getImageKey(id, 'ORIGINAL'),
  })

  job.updateProgress(10)
  job.log('downloaded image')

  if (!img.Body) {
    throw new Error('image has no body! spooky...')
  }

  if (!(img.Body instanceof Readable)) {
    throw new Error('image body is not readable')
  }

  const buffer = await streamToBuffer(img.Body)
  const metadata = await sharp(buffer).metadata()
  if (!metadata.width || !metadata.height) {
    throw new Error('image dimensions not found')
  }

  job.log('parsed metadata')

  const outputs: {
    size: PhotoSizeEnum
    buf: Buffer
  }[] = []

  // Full res optimized webp image
  const fullRes = await sharp(buffer)
    .webp({ quality: 80 })
    .withMetadata()
    .toBuffer()
  outputs.push({ size: 'FULL', buf: fullRes })

  job.updateProgress(20)
  job.log('created full resolution webp')

  // First do all image resizing sequentially, CPU bound
  for (const size of IMG_SIZES) {
    const width = sizeToWidth(size)
    if (!width) {
      continue
    }

    const output = await sharp(buffer)
      .resize(width)
      .webp({ quality: 80 })
      .toBuffer()

    outputs.push({ size, buf: output })

    job.log(`created ${size} resolution webp`)
  }

  job.updateProgress(70)
  job.log('creating blurhash')

  // Generate and save blurhash to db
  const blurHash = await generateBlurHash(outputs[outputs.length - 1].buf)

  job.log('created blurhash')

  await prisma.photo.update({
    where: {
      id,
    },
    data: {
      blurHash,
    },
  })

  job.log('updated photo db entry with blurhash')

  const uploads = []

  for (const output of outputs) {
    const key = getImageKey(id, output.size)

    // Upload each small pic
    const uploadPromise = aggregatedS3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: output.buf,
      ContentDisposition: filename,
      ContentType: mimetype,
    })

    uploads.push(uploadPromise)
  }

  job.log(`uploading ${uploads.length} photos...`)

  // Uploads can be concurrent
  await Promise.all(uploads)
  job.updateProgress(100)
  job.log('photos uploaded')
}

async function generateBlurHash(input: Buffer): Promise<string> {
  const { data, info } = await sharp(input).raw().ensureAlpha().toBuffer({
    resolveWithObject: true,
  })

  const clamped = new Uint8ClampedArray(data)

  return encode(clamped, info.width, info.height, 4, 4)
}
