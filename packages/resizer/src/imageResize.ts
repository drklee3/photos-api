import type { S3 } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { Readable } from 'stream'
import { encode } from 'blurhash'
import { ImageResizeJob } from '@picatch/shared'
import { getImageKey, sizeToWidth } from './image'
import type { Sdk } from '@picatch/client'
import { PhotoSize } from '@picatch/client'
import { log } from './logger'

function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Array<any> = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

const IMG_SIZES: PhotoSize[] = [
  PhotoSize.Large,
  PhotoSize.Medium,
  PhotoSize.Small,
  PhotoSize.Thumbnail,
]

export async function resizeImage(
  s3client: S3,
  queryClient: Sdk,
  job: ImageResizeJob,
) {
  log.debug('worker process: got new job:', job)
  const { id, filename, mimetype } = job

  // Get original image
  const img = await s3client.getObject({
    Bucket: process.env.S3_BUCKET,
    Key: getImageKey(id, PhotoSize.Original),
  })

  log.debug('downloaded image')

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

  log.debug('parsed metadata')

  const outputs: {
    size: PhotoSize
    buf: Buffer
  }[] = []

  // Full res optimized webp image
  const fullRes = await sharp(buffer)
    .webp({ quality: 80 })
    .withMetadata()
    .toBuffer()
  outputs.push({ size: PhotoSize.Full, buf: fullRes })

  log.debug('created full resolution webp')

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

    log.debug(`created ${size} resolution webp`)
  }

  log.debug('creating blurhash')

  // Generate and save blurhash to db
  const blurHash = await generateBlurHash(outputs[outputs.length - 1].buf)

  log.debug('created blurhash')

  try {
    await queryClient.UpdateOnePhoto({
      data: {
        blurHash: {
          set: blurHash,
        },
      },
      where: {
        id,
      },
    })
  } catch (e) {
    log.error('failed to update photo via graphql', e)
  }

  log.debug('updated photo db entry with blurhash')

  const uploads = []

  for (const output of outputs) {
    const key = getImageKey(id, output.size)

    // Upload each small pic
    const uploadPromise = s3client.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: output.buf,
      ContentDisposition: filename,
      ContentType: mimetype,
    })

    uploads.push(uploadPromise)
  }

  log.debug(`uploading ${uploads.length} photos...`)

  // Uploads can be concurrent
  await Promise.all(uploads)

  log.debug(`${uploads.length} photos uploaded`)
}

async function generateBlurHash(input: Buffer): Promise<string> {
  const { data, info } = await sharp(input).raw().ensureAlpha().toBuffer({
    resolveWithObject: true,
  })

  const clamped = new Uint8ClampedArray(data)

  return encode(clamped, info.width, info.height, 4, 4)
}
