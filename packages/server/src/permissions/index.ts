import { allow, deny, not, or, rule, shield } from 'graphql-shield'
import { getUserId } from '../utils/getUserId'
import { Context } from '../context'
import { getApiTokenFromReq } from '../utils/apiToken'

const rules = {
  isAuthenticatedUser: rule()(
    async (_parent, _args, context: Context): Promise<boolean> => {
      const userId = await getUserId(context)

      console.log('is authenticated user: ', !!userId, userId)

      return !!userId
    },
  ),
  isAlbumOwner: rule()(
    async (_parent, args, context: Context): Promise<boolean> => {
      const userId = await getUserId(context)

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
  isPhotoOwner: rule()(
    async (_parent, args, context: Context): Promise<boolean> => {
      const userId = await getUserId(context)

      if (!userId) {
        return false
      }

      const author = await context.prisma.photo
        .findUnique({
          where: {
            id: args.id,
          },
        })
        .author()

      return userId === author?.id
    },
  ),
  isValidApiToken: rule()(
    async (_parent, args, context: Context): Promise<boolean> => {
      const apiToken = getApiTokenFromReq(context.req)

      if (!apiToken) {
        return false
      }

      const foundToken = await context.prisma.apiToken.findUnique({
        where: {
          token: apiToken,
        },
      })

      if (!foundToken) {
        return false
      }

      // No allowed IPs mean no IP enforcement
      if (foundToken.allowedIPs.length === 0) {
        return true
      }

      // Should trust proxy in order to get real client IP
      return foundToken.allowedIPs.includes(context.req.ip)
    },
  ),
}

const dev = process.env.NODE_ENV !== 'production'

export const permissions = shield(
  {
    Query: {
      currentUser: rules.isAuthenticatedUser,
    },
    Mutation: {
      deleteOneAlbum: rules.isAlbumOwner,
      updateOnePhoto: or(rules.isPhotoOwner, rules.isValidApiToken),
    },
    User: allow,
  },
  {
    fallbackRule: allow,
    allowExternalErrors: dev,
  },
)
