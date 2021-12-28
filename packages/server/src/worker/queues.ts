import { Queue, QueueScheduler } from 'bullmq'
import { redisConnectionInfo } from './connection'

export const NEW_PHOTOS_QUEUE = 'newphoto'

export const NewPhotosQueue = new Queue(NEW_PHOTOS_QUEUE, redisConnectionInfo)
export const queueScheduler = new QueueScheduler(
  NEW_PHOTOS_QUEUE,
  redisConnectionInfo,
)
