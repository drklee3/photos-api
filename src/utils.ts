import { Context } from './context'

export function getUserId(context: Context): string | undefined {
  console.log(context.req)

  const userId = context.req.session.userId

  if (!userId) {
    return
  }

  return userId
}
