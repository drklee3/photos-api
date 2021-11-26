import { allow, deny, not, rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context): boolean => {
    const userId = getUserId(context)

    console.log('is authenticated user: ', !!userId, userId)

    return !!userId
  }),
  isAlbumOwner: rule()(
    async (_parent, args, context: Context): Promise<boolean> => {
      const userId = getUserId(context)

      if (!userId) {
        return false
      }

      const author = await context.prisma.album
        .findUnique({
          where: {
            id: args.id,
          },
        })
        .author()

      return userId === author?.id
    },
  ),
}

export const permissions = shield(
  {
    Query: {
      currentUser: rules.isAuthenticatedUser,
    },
    Mutation: {
      signup: not(rules.isAuthenticatedUser),
      login: not(rules.isAuthenticatedUser),
      logout: rules.isAuthenticatedUser,
      deleteOneAlbum: rules.isAlbumOwner,
    },
    User: allow,
  },
  {
    fallbackRule: allow,
  },
)
