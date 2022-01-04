import { S3 } from '@aws-sdk/client-s3'
import { getSdk } from '@picatch/client'
import { GraphQLClient } from 'graphql-request'
import amqp, { Channel } from 'amqp-connection-manager'
import { ConsumeMessage } from 'amqplib'
import { ImageResizeJob, IMAGE_RESIZE_QUEUE_NAME } from '@picatch/shared'
import { resizeImage } from './imageResize'

// S3
export const aggregatedS3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

// GRAPHQL
const graphqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT!)
const queryClient = getSdk(graphqlClient)

// AMQP
const amqpConn = amqp.connect(process.env.AMQP_ENDPOINT!)
amqpConn.on('connect', () => {
  console.log('amqp connected')
})

amqpConn.on('disconnect', (err) => {
  console.log('amqp disconnected', err)
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
    console.log('received null message')
    return
  }

  const job: ImageResizeJob = JSON.parse(msg.content.toString())
  console.log('receiver: got message', job)

  await resizeImage(aggregatedS3, queryClient, job)
  channelWrapper.ack(msg)
}

function shutdown() {
  console.log('Shutting down...')
  shutdownAsync()
  process.exit()
}

async function shutdownAsync() {
  await channelWrapper.close()
  await amqpConn.close()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
