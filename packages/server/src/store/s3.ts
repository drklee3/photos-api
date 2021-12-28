import { GetObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl as s3GetSignedUrl } from '@aws-sdk/s3-request-presigner'

export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

const PUBLIC_S3_HOST = process.env.PUBLIC_S3_ENDPOINT

const SECONDS_IN_DAY = 60 * 60 * 24

export async function getSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  })

  const signedUrl = await s3GetSignedUrl(aggregatedS3, command, {
    expiresIn: SECONDS_IN_DAY * 7,
  })

  if (!PUBLIC_S3_HOST) {
    return signedUrl
  }

  // Replace signed url with public s3 host ie cloudflare proxy for free bandwidth
  const url = new URL(signedUrl)
  url.host = PUBLIC_S3_HOST

  return url.toString()
}
