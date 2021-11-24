import { verify } from 'jsonwebtoken'
import { Context } from './context'

export const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

export function getUserId(context: Context): string | undefined {
  const authHeader = context.req.get('Authorization')

  if (!authHeader) {
    return
  }

  const token = authHeader.replace('Bearer ', '')
  const verifiedToken = verify(token, APP_SECRET) as Token

  if (!verifiedToken) {
    return
  }

  return verifiedToken.userId
}
