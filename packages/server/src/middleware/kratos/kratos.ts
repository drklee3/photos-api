import { NextFunction, Request, Response } from 'express'
import { log } from '../../utils/logger'
import { RouteOptionsCreator } from './route'

/**
 * Sets the session in the request. If no session is found,
 * the request still succeeds.
 *
 * This does **not** redirect the user or initiate any additional actions, as
 * it is done in the app. This is only for the server to know which user is
 * logged in.
 *
 * @param createHelpers
 */
export function setSession(createHelpers: RouteOptionsCreator) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization')?.replace('Bearer', '')
    const cookieHeader = req.header('cookie')

    log.debug({ authHeader, cookieHeader })

    const { sdk } = createHelpers(req)

    try {
      const session = await sdk.toSession(authHeader, cookieHeader)
      req.session.kratos = session.data
    } catch (e) {
      log.debug('user is unauthorized')
    }

    next()
  }
}
