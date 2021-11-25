import { APP_SECRET, getUserId } from '../../utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { intArg, nonNull, objectType, stringArg, arg, extendType } from 'nexus'
import { Context } from '../../context'

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            username: args.username,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    /*
    t.field('createAlbum', {
      type: 'Album',
      args: {
        data: nonNull(
          arg({
            type: 'AlbumCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context)

        if (!userId) {
          throw new Error('userId not found')
        }

        return context.prisma.album.create({
          data: {
            title: args.data.title,
            description: args.data.content,
            authorId: userId,
            visibility: 'PRIVATE',
          },
        })
      },
    })
    */

    t.field('updateAlbumVisibility', {
      type: 'Album',
      args: {
        id: nonNull(stringArg()),
        visibility: nonNull(
          arg({
            type: 'Visibility',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        try {
          const _post = await context.prisma.album.findUnique({
            where: { id: args.id },
          })
          return context.prisma.album.update({
            where: { id: args.id || undefined },
            data: { visibility: args.visibility || undefined },
          })
        } catch (e) {
          throw new Error(
            `Post with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })

    t.field('incrementAlbumViewCount', {
      type: 'Album',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.album.update({
          where: { id: args.id },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        })
      },
    })

    t.field('deleteAlbum', {
      type: 'Album',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.album.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})
