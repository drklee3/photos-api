import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    return !!context.req.session?.active
  }),
  isAlbumOwner: rule()(async (_parent, args, context: Context) => {
    const userId = getUserId(context)

    context.req.session?.id
    const author = await context.prisma.album
      .findUnique({
        where: {
          id: args.id,
        },
      })
      .author()
    return userId === author?.id
  }),
}

export const permissions = shield({
  Query: {
    photos: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser,
  },
  /*

  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    incrementPostViewCount: rules.isAuthenticatedUser,
    togglePublishPost: rules.isPostOwner,
  },
  */
})
