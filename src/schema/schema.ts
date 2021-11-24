import { makeSchema } from 'nexus'
import { nexusPrisma } from '@kenchi/nexus-plugin-prisma'
import * as path from 'path'
import * as types from './types'
import { permissions } from '../permissions'
import { applyMiddleware } from 'graphql-middleware'

/**

import { permissions } from '../permissions'
import { APP_SECRET, getUserId } from '../utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { applyMiddleware } from 'graphql-middleware'
import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from '../context'
import { nexusPrisma } from 'nexus-plugin-prisma'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.user.findUnique({
          where: {
            id: userId,
          },
        })
      },
    })

    t.nullable.field('albumById', {
      type: 'Album',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.album.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })

    t.nonNull.list.nonNull.field('publicAlbums', {
      type: 'Album',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({
          type: 'AlbumOrderByUpdatedAtInput',
        }),
      },
      resolve: (_parent, args, context: Context) => {
        const or = args.searchString
          ? {
              OR: [
                { title: { contains: args.searchString } },
                { description: { contains: args.searchString } },
              ],
            }
          : {}

        return context.prisma.album.findMany({
          where: {
            visibility: 'PRIVATE',
            ...or,
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy || undefined,
        })
      },
    })

    t.list.field('albumsByUser', {
      type: 'Album',
      args: {
        userUniqueInput: nonNull(
          arg({
            type: 'UserUniqueInput',
          }),
        ),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: {
              id: args.userUniqueInput.id || undefined,
              email: args.userUniqueInput.email || undefined,
            },
          })
          .albums({
            where: {
              visibility: 'PRIVATE',
            },
          })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
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

    t.field('updateAlbumVisibility', {
      type: 'Album',
      args: {
        id: nonNull(intArg()),
        visibility: arg({
          type: 'VisibilityInput',
        }),
      },
      resolve: async (_, args, context: Context) => {
        try {
          const _post = await context.prisma.album.findUnique({
            where: { id: args.id },
          })
          return context.prisma.album.update({
            where: { id: args.id || undefined },
            data: { visibility: args.visibility },
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
        id: nonNull(intArg()),
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
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.album.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('username')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('albums', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .albums()
      },
    })
  },
})

const Visibility = enumType({
  name: 'Visibility',
  members: ['PRIVATE', 'LINK', 'PUBLIC'],
  description: 'User visibility of an album',
})

const Post = objectType({
  name: 'Album',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.string('description')

    t.nonNull.field('visibility', { type: Visibility })
    t.nonNull.int('viewCount')

    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.album
          .findUnique({
            where: { id: parent.id },
          })
          .author()
      },
    })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const PostOrderByUpdatedAtInput = inputObjectType({
  name: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' })
  },
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('name')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})


 */

const schemaWithoutPermissions = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
})

export default applyMiddleware(schemaWithoutPermissions, permissions)
