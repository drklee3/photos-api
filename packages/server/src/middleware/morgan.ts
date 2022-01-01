import type { Express } from 'express'
import morgan from 'morgan'

export default function installMorgan(app: Express) {
  app.use(morgan('combined'))
}
