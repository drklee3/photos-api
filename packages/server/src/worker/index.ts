import { Job, Worker } from 'bullmq'
import path from 'path'
import { NEW_PHOTOS_QUEUE } from './queues'

const processorFile = path.join(__dirname, 'imageResize.ts')
const worker = new Worker(NEW_PHOTOS_QUEUE, processorFile)

worker.on('completed', (job: Job, returnValue: any) => {
  console.log(`job ${job} completed:`, returnValue)
})

worker.on('progress', (job: Job, progress: number | object) => {
  console.log(`job ${job} progress: ${progress}`)
})

worker.on('failed', (job: Job, reason: string) => {
  console.log(`job ${job} failed: ${reason}`)
})

worker.on('error', (err) => {
  console.error(err)
})
