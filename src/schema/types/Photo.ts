import { objectType } from 'nexus'

export default objectType({
  name: 'Photo',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.title()
    t.model.description()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
