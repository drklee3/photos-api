import { objectType } from 'nexus'

export default objectType({
  name: 'UsersOnAlbums',
  definition(t) {
    t.model.album()
    t.model.user()
    t.model.addedAt()
    t.model.role()
  },
})
