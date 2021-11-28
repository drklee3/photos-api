import {
  arg,
  asNexusMethod,
  list,
  mutationField,
  nonNull,
  objectType,
} from 'nexus'
import { uploadFile } from './uploadFile'
import { fileTypeFromStream } from 'file-type'
import { GraphQLUpload } from 'graphql-upload'
import { Context } from '../../context'
import { Photo } from '.prisma/client'
import { getUserId } from '../../utils'

export default objectType({
  name: 'Photo',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.title()
    t.model.description()
    t.model.fileName()
    t.model.width()
    t.model.height()
    t.model.mimetype()
    t.model.size()
    t.model.exif()

    t.model.createdAt()
    t.model.updatedAt()

    t.model.albums()
  },
})

const UploadPhoto = mutationField('uploadPhotos', {
  type: nonNull(list(nonNull('Photo'))),
  args: {
    files: nonNull(list(nonNull(arg({ type: 'Upload' })))),
  },
  async resolve(parent, args, context: Context) {
    // https://github.com/graphql-nexus/nexus/issues/441#issuecomment-665776307

    // Ensure an error storing one upload doesn’t prevent storing the rest.
    const results = await Promise.allSettled(args.files.map(uploadFile))

    const userId = getUserId(context)
    if (!userId) {
      throw new Error("user id not found, this shouldn't happen")
    }

    const photos = results.reduce((photos: any, result) => {
      if (result.status === 'rejected') {
        // TODO: do more than just log an error, respond with failed items so
        // client can retry?
        console.error(`Failed to process upload: ${result.reason}`)
        return
      }

      const {
        value: { filename, metadata },
      } = result

      const photo: Partial<Photo> = {
        authorId: userId,
        fileName: filename,
        width: metadata.width,
        height: metadata.height,
        size: metadata.size,
        exif: metadata.exif.exif,
      }

      photos.push(photo)
      return photos
    }, [])

    await context.prisma.photo.createMany({ data: photos })

    return photos
  },
})

const Upload = asNexusMethod(GraphQLUpload, 'upload')

const UploadFile = objectType({
  name: 'UploadFile',
  definition(t) {
    t.string('uri')
    t.string('filename')
  },
})

export { UploadPhoto, Upload, UploadFile }
