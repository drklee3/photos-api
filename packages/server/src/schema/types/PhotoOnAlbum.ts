import { objectType } from 'nexus'

export default objectType({
  name: 'PhotoOnAlbum',
  definition(t) {
    t.model.album()
    t.model.photo()
    t.model.comments()
    t.model.likes()

    t.model.addedAt()
  },
})
