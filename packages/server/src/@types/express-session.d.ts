// https://stackoverflow.com/questions/65805015/extending-session-object-in-express-session
import type { Session } from '@ory/kratos-client'

declare module 'express-session' {
  interface SessionData {
    userId?: string
    kratos?: Session
  }
}

export {}
