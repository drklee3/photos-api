import { Context } from '../context'

// Returns a user ID and ensures the user exists
export async function getUserId(context: Context): Promise<string | undefined> {
  const kratosSession = context.req.kratosSession

  if (!kratosSession) {
    return
  }

  const userId = kratosSession.identity.id

  // Fallback username to the user ID -- this only happens with existing users rn
  // TODO: remove this after db is reset
  const { email, username = kratosSession.identity.id } =
    kratosSession.identity.traits

  // Make sure user exists or is up to date
  await context.prisma.user.upsert({
    create: {
      id: userId,
      email: email,
      username: username,
    },
    update: {
      email: email,
      username: username,
    },
    where: { id: userId },
  })

  return userId
}
