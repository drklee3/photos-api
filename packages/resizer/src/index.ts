import { ConsumeMessage } from 'amqplib'
import { getSdk } from '@picatch/client'
import { GraphQLClient } from 'graphql-request'
import { ImageResizeJob, IMAGE_RESIZE_QUEUE_NAME } from '@picatch/shared'
import { resizeImage } from './imageResize'
import { S3 } from '@aws-sdk/client-s3'
import amqp, { Channel } from 'amqp-connection-manager'
import dotenv from 'dotenv'
import { log } from './logger'

dotenv.config()

// S3
export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

if (!process.env.GRAPHQL_AUTH_TOKEN) {
  throw new Error('GRAPHQL_AUTH_TOKEN is not set')
}

// GRAPHQL
const graphqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT!, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}`,
  },
})
const queryClient = getSdk(graphqlClient)

if (!process.env.AMQP_ENDPOINT) {
  throw new Error('AMQP_ENDPOINT is not set')
}

// AMQP
const amqpConn = amqp.connect(process.env.AMQP_ENDPOINT)
amqpConn.on('connect', () => {
  log.info('amqp connected')
})

amqpConn.on('disconnect', (err) => {
  log.info('amqp disconnected', err)
})

const channelWrapper = amqpConn.createChannel({
  name: IMAGE_RESIZE_QUEUE_NAME,
  json: true,
  setup: (channel: Channel) => {
    return Promise.all([
      channel.assertQueue(IMAGE_RESIZE_QUEUE_NAME, { durable: true }),
      channel.prefetch(1),
      channel.consume(IMAGE_RESIZE_QUEUE_NAME, onMessage),
    ])
  },
})

async function onMessage(msg: ConsumeMessage | null) {
  if (msg === null) {
    log.warn('received null message')
    return
  }

  const job: ImageResizeJob = JSON.parse(msg.content.toString())
  log.debug('receiver: got message', job)

  await resizeImage(aggregatedS3, queryClient, job)
  channelWrapper.ack(msg)
}

function shutdown() {
  log.info('Shutting down...')
  shutdownAsync()
}

async function shutdownAsync() {
  log.info('closing channel')
  await channelWrapper.close()
  log.info('closing amqp connection')
  await amqpConn.close()
  log.info('bye')

  process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
