import { objectType } from 'nexus'

export default objectType({
  name: 'Like',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.photo()
    t.model.createdAt()
  },
})
