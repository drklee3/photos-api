import { mutationType } from 'nexus'

export default mutationType({
  definition(t) {
    t.crud.updateOneUser()
    t.crud.deleteOneUser()

    t.crud.updateOnePhoto()
    t.crud.deleteOnePhoto()

    t.crud.createOneAlbum()
    t.crud.updateOneAlbum()
    t.crud.deleteOneAlbum()

    t.crud.createOnePhotoOnAlbum()
    t.crud.updateOnePhotoOnAlbum()
    t.crud.deleteOnePhotoOnAlbum()

    t.crud.createOneComment()
    t.crud.updateOneComment()
    t.crud.deleteOneComment()
  },
})
