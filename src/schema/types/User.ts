import { objectType } from 'nexus'

export default objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.username()
    t.model.email()
    t.model.photos({ type: 'Photo' })
    t.model.albums()
    t.model.sharedAlbums()
    t.model.comments()
  },
})
