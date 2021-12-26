import { SandboxedJob } from 'bullmq'
import { S3 } from '@aws-sdk/client-s3'
import sharp, { Metadata } from 'sharp'
import { Readable, Stream } from 'stream'
import { encode } from 'blurhash'
import { PrismaClient } from '.prisma/client'
import { generate } from '@kenchi/nexus-plugin-prisma/dist/typegen'
import path from 'path'
import { ImageResizeJob } from './model/imageResizeJob'

export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

const prisma = new PrismaClient()

function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Array<any> = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

const IMG_SIZES = [1000, 800, 400, 200]

export default async function (job: SandboxedJob<ImageResizeJob>) {
  const { id, filename, mimetype } = job.data
  const extension = path.extname(filename)

  // Get original image
  const img = await aggregatedS3.getObject({
    Bucket: process.env.S3_BUCKET,
    Key: id + extension,
  })

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

  const outputs = []

  // Full res optimized webp image
  const fullRes = await sharp().webp({ quality: 80 }).withMetadata().toBuffer()
  outputs.push({ size: null, buf: fullRes })

  // First do all image resizing sequentially, CPU bound
  for (const size of IMG_SIZES) {
    const output = await sharp(buffer)
      .resize(size)
      .webp({ quality: 80 })
      .toBuffer()

    outputs.push({ size, buf: output })
  }

  // Generate and save blurhash to db
  const blurHash = await generateBlurHash(
    outputs[outputs.length - 1].buf,
    metadata.width,
    metadata.height,
  )

  await prisma.photo.update({
    where: {
      id,
    },
    data: {
      blurHash,
    },
  })

  const uploads = []

  for (const output of outputs) {
    // Add output size to end of filename, extension already has a . in front
    let key = id + '.full' + extension
    if (output.size) {
      key = `${id}.${output.size}${extension}`
    }

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

  // Uploads can be concurrent
  await Promise.all(uploads)
}

async function generateBlurHash(
  input: Buffer,
  width: number,
  height: number,
): Promise<string> {
  const data = new Uint8ClampedArray(input)

  return encode(
    // Use the last thumbnail image for smallest encode size
    data,
    width,
    height,
    4,
    4,
  )
}
