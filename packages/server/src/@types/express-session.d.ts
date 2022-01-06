// https://stackoverflow.com/questions/65805015/extending-session-object-in-express-session
import type { Session as KratosSession } from '@ory/kratos-client'

declare global {
  namespace Express {
    // Inject additional properties on express.Request
    interface Request {
      kratosSession: KratosSession
    }
  }
}
