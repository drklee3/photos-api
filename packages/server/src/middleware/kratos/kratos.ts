import { Session as KratosSession } from '@ory/kratos-client'
import { AxiosError } from 'axios'
import { NextFunction, Request, Response } from 'express'

import { RouteOptionsCreator } from './route'

/**
 * Adds the session to the request object.
 *
 * @param req
 */
const addSessionToRequest =
  (req: Request) =>
  ({ data: session }: { data: KratosSession }) => {
    // `whoami` returns the session or an error. We're changing the type here
    // because express-session is not detected by TypeScript automatically.
    req.session.kratos = session
  }

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
export const setSession =
  (createHelpers: RouteOptionsCreator) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization')?.replace('Bearer', '')
    const cookieHeader = req.header('cookie')

    const { sdk } = createHelpers(req)

    sdk
      .toSession(authHeader, cookieHeader)
      .then(addSessionToRequest(req))
      .then(() => next())
  }
