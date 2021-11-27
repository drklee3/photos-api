import { enumType, objectType } from 'nexus'

const UserOnAlbums = objectType({
  name: 'UsersOnAlbums',
  definition(t) {
    t.model.album()
    t.model.user()
    t.model.addedAt()
    t.model.role()
  },
})

const AlbumRole = enumType({
  name: 'AlbumPermissions',
  members: ['VIEWER', 'COMMENTER', 'EDITOR'],
  description: 'User role of an album',
})

export { UserOnAlbums, AlbumRole }
