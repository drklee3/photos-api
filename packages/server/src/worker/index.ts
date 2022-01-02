import { Job, Worker } from 'bullmq'
import path from 'path'
import { NEW_PHOTOS_QUEUE } from './queues'
import { ImageResizeJob } from './model/imageResizeJob'
import {} from './imageResize'
import { redisConnectionInfo } from './connection'

const processorFile = path.join(__dirname, 'imageResize.ts')

export const worker = new Worker<ImageResizeJob>(
  NEW_PHOTOS_QUEUE,
  processorFile,
  {
    ...redisConnectionInfo,
    autorun: true,
  },
)

worker.on('completed', (job: Job, returnValue: any) => {
  console.log(`job ${job} completed:`, returnValue)
})

worker.on('progress', (job: Job, progress: number | object) => {
  console.log(`job ${job} progress: ${progress}`)
})

worker.on('failed', (job: Job, error: Error, prev: string) => {
  console.log(`job ${job} failed: ${error}`)
})

worker.on('error', (err) => {
  console.error(err)
})

worker.on('active', (job: Job) => {
  console.log(`worker started job ${job.id}`)
})
