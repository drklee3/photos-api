import { getUserId } from '../../utils'
import { hash, verify } from 'argon2'

import { intArg, nonNull, objectType, stringArg, arg, extendType } from 'nexus'
import { Context } from '../../context'
import { NexusNullDef } from 'nexus/dist/core'
import { Prisma } from '.prisma/client'

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password)

        let user

        try {
          user = await context.prisma.user.create({
            data: {
              username: args.username,
              email: args.email,
              password: hashedPassword,
            },
          })
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
              // Should return error instead of throwing for graphql-shield
              // but return type doesn't match rip
              throw new Error('Username or email is already taken')
            }
          }

          throw e
        }

        // Save to session
        context.req.session.userId = user.id
        context.req.session.save()
        return user
      },
    })

    t.field('login', {
      type: 'User',
      args: {
        emailOrUsername: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (
        _parent,
        { emailOrUsername, password },
        context: Context,
      ) => {
        // Should only have one but can't use findUnique
        const user = await context.prisma.user.findFirst({
          where: {
            OR: [
              {
                email: emailOrUsername,
              },
              {
                username: emailOrUsername,
              },
            ],
          },
        })

        if (!user) {
          throw new Error(
            `No user found for email or username: ${emailOrUsername}`,
          )
        }

        const passwordValid = await verify(user.password, password)

        if (!passwordValid) {
          throw new Error('Invalid password')
        }

        // Logged in, save user id to session
        context.req.session.userId = user.id
        context.req.session.save()

        return user
      },
    })

    t.field('logout', {
      type: 'Boolean',
      args: {},
      resolve: async (_parent, {}, context: Context) => {
        // Logged in, save user id to session
        context.req.session.destroy(() => {})

        return true
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
  },
})
