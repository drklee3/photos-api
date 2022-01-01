import session from './session'
import type { Express } from 'express'
import installKratos from './kratos'
import installMorgan from './morgan'

export function registerMiddlewares(app: Express) {
  session(app)
  installKratos(app)
  installMorgan(app)
}
