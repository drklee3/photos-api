import { randomBytes } from 'crypto'
import { Request } from 'express'

const TOKEN_PREFIX = 'PICATCH_'

// This is only for generating tokens for internal APIs, ie image resizer
export function generateApiToken() {
  const token = randomBytes(32).toString('hex')
  return TOKEN_PREFIX + token
}

export function getApiTokenFromReq(req: Request): string | undefined {
  const authHeader = req.header('authorization')?.replace('Bearer', '').trim()

  return authHeader
}
