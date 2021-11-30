import { Worker } from 'bullmq'
import path from 'path'
import { NEW_PHOTOS_QUEUE } from './queues'

const processorFile = path.join(__dirname, 'imageResize.ts')
const worker = new Worker(NEW_PHOTOS_QUEUE, processorFile)
