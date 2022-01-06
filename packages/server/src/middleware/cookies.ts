import type { Express } from 'express'
import cookieParser from 'cookie-parser'

export default function installCookieParser(app: Express) {
  app.use(cookieParser())
}
