import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.username()
    t.model.email()
    t.model.photos()
    t.model.albums()
    t.model.sharedAlbums()
    t.model.comments()
  },
})
