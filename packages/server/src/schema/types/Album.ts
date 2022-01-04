import { enumType, mutationField, nonNull, objectType, stringArg } from 'nexus'
import { Context } from '../../context'
import { getUserId } from '../../utils/getUserId'

const Album = objectType({
  name: 'Album',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.title()
    t.model.description()
    t.model.photos()
    t.model.viewCount()
    t.model.visibility()
    t.model.members()

    t.model.createdAt()
    t.model.updatedAt()
  },
})

const Visibility = enumType({
  name: 'Visibility',
  members: ['PRIVATE', 'LINK', 'PUBLIC'],
  description: 'User visibility of an album',
})

const ShareAlbum = mutationField('shareAlbum', {
  type: 'Album',
  args: {
    targetUserId: nonNull(stringArg()),
    albumId: nonNull(stringArg()),
    role: nonNull('AlbumRole'),
  },
  resolve: async (
    _parent,
    { targetUserId, albumId, role },
    context: Context,
  ) => {
    const album = await context.prisma.album.findUnique({
      where: {
        id: albumId,
      },
    })

    if (!album) {
      throw new Error('album not found')
    }

    const targetUser = await context.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    })

    if (!targetUser) {
      throw new Error('user not found')
    }

    const albumMember = await context.prisma.userOnAlbum.findUnique({
      where: {
        albumId_userId: {
          albumId: albumId,
          userId: targetUserId,
        },
      },
    })

    if (albumMember) {
      throw new Error('album already shared with user')
    }

    await context.prisma.userOnAlbum.create({
      data: {
        albumId: albumId,
        userId: targetUserId,
      },
    })

    return album
  },
})

const IncrementAlbumViewcount = mutationField('incrementAlbumViewCount', {
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

export { Album, Visibility, ShareAlbum, IncrementAlbumViewcount }
