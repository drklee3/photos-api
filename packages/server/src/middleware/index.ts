import session from './session'
import type { Express } from 'express'
import installKratos from './kratos'

export function registerMiddlewares(app: Express) {
  session(app)
  installKratos(app)
}
