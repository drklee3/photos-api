import { objectType } from 'nexus'

export default objectType({
  name: 'PhotosOnAlbums',
  definition(t) {
    t.model.album()
    t.model.photo()
    t.model.addedAt()
    t.model.comments()
  },
})
