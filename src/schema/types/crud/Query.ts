import { queryType } from 'nexus'

export default queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({
      ordering: true,
    })
    t.crud.album()
    t.crud.albums({
      filtering: true,
      ordering: true,
    })
    t.crud.photosOnAlbums({
      filtering: true,
      ordering: true,
    })

    t.crud.comment()
    t.crud.comments({
      ordering: true,
    })
  },
})
