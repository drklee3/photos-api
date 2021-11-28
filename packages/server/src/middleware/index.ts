import session from './session'
import type { Express } from 'express'

export function registerMiddlewares(app: Express) {
  session(app)
}
