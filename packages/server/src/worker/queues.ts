import { Queue } from 'bullmq'

export const NEW_PHOTOS_QUEUE = 'new photo processing'

export function NewPhotosQueue(): Queue {
  return new Queue(NEW_PHOTOS_QUEUE, {
    connection: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
    },
  })
}
