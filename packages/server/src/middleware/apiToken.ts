import { randomBytes } from 'crypto'

const TOKEN_PREFIX = 'PICATCH_'

// This is only for generating tokens for internal APIs, ie image resizer
export function generateApiToken() {
  const token = randomBytes(32).toString('hex')
  return TOKEN_PREFIX + token
}
