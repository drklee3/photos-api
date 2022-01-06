import type { Express } from 'express'
import installKratos from './kratos'
import installMorgan from './morgan'
import installCookieParser from './cookies'

export function registerMiddlewares(app: Express) {
  installCookieParser(app)
  installKratos(app)
  installMorgan(app)
}
