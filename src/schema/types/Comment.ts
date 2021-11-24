import { objectType } from 'nexus'

export default objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.content()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.photo()
  },
})
