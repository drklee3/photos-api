import { Context } from '../context'

// Returns a user ID and ensures the user exists
export async function getUserId(context: Context): Promise<string | undefined> {
  const kratosSession = context.req.kratosSession

  if (!kratosSession) {
    return
  }

  const userId = kratosSession.identity.id

  // Make sure user exists or is up to date
  await context.prisma.user.upsert({
    create: {
      id: userId,
      email: kratosSession.identity.traits.email,
      username: kratosSession.identity.traits.username,
    },
    update: {
      email: kratosSession.identity.traits.email,
      username: kratosSession.identity.traits.username,
    },
    where: { id: userId },
  })

  return userId
}
