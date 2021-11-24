import { objectType } from 'nexus'

export default objectType({
  name: 'Album',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.title()
    t.model.description()
    t.model.photos()
    t.model.viewCount()
    t.model.visibility()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
