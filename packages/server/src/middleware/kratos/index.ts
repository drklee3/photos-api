import type { Express } from 'express'
import sdk, { apiBaseUrl } from './sdk'
import { setSession } from './kratos'
import { RouteOptionsCreator } from './route'

const config: RouteOptionsCreator = () => {
  return {
    apiBaseUrl: apiBaseUrl,
    kratosBrowserUrl: apiBaseUrl,
    sdk,
  }
}

export default function installKratos(app: Express) {
  app.use(setSession(config))
}
