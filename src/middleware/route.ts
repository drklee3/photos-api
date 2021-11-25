import { V0alpha2ApiInterface } from '@ory/kratos-client'
import { Application, NextFunction, Request, Response } from 'express'

export interface RouteOptions {
  sdk: V0alpha2ApiInterface
  apiBaseUrl: string
  kratosBrowserUrl: string
  baseUrlWithoutTrailingSlash?: string
}

export type RouteOptionsCreator = (req: Request) => RouteOptions

export type RouteCreator = (
  opts: RouteOptionsCreator,
) => (req: Request, res: Response, next: NextFunction) => void

export type RouteRegistrator = (
  app: Application,
  createHelpers?: RouteOptionsCreator,
  route?: string,
) => void
