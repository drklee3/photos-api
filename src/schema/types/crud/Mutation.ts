import { GraphQLError } from 'graphql'
import {
  arg,
  asNexusMethod,
  list,
  mutationType,
  nonNull,
  objectType,
  scalarType,
} from 'nexus'
import { uploadFile } from './uploadFile'
import { fileTypeFromStream } from 'file-type'
import { GraphQLUpload } from 'graphql-upload'

export default mutationType({
  definition(t) {
    t.crud.updateOneUser()
    t.crud.deleteOneUser()

    t.field('uploadPhotos', {
      type: nonNull(list(nonNull('UploadFile'))),
      args: {
        files: nonNull(list(nonNull(arg({ type: 'Upload' })))),
      },
      async resolve(parent, args) {
        // Ensure an error storing one upload doesn’t prevent storing the rest.
        const results = await Promise.allSettled(args.files.map(uploadFile))

        return results.reduce((storedFiles: any, result) => {
          if (result.status === 'rejected') {
            // TODO: do more than just log an error
            console.error(`Failed to store upload: ${result.reason}`)
            return
          }

          storedFiles.push(result.value)
          return storedFiles
        }, [])
      },
    })
    t.crud.updateOnePhoto()
    t.crud.deleteOnePhoto()

    t.crud.createOneAlbum()
    t.crud.updateOneAlbum()
    t.crud.deleteOneAlbum()

    t.crud.createOnePhotosOnAlbums()
    t.crud.updateOnePhotosOnAlbums()
    t.crud.deleteOnePhotosOnAlbums()

    t.crud.createOneComment()
    t.crud.updateOneComment()
    t.crud.deleteOneComment()
  },
})

export const Upload = asNexusMethod(GraphQLUpload, 'upload')

export const UploadFile = objectType({
  name: 'UploadFile',
  definition(t) {
    t.string('uri')
    t.string('filename')
  },
})
