import {
  arg,
  asNexusMethod,
  enumType,
  list,
  mutationField,
  nonNull,
  objectType,
} from 'nexus'
import { uploadFile } from '../../store/uploadFile'
import { fileTypeFromStream } from 'file-type'
import { GraphQLUpload } from 'graphql-upload'
import { Context } from '../../context'
import { Photo, Prisma } from '.prisma/client'
import { getUserId } from '../../utils/getUserId'
import { GraphQLScalarType } from 'graphql'
import { getSignedUrl } from '../../store/s3'
import { getImageKey } from '../../store/image'

const PhotoSize = enumType({
  name: 'PhotoSize',
  description: 'The size of a photo',
  members: ['ORIGINAL', 'FULL', 'LARGE', 'MEDIUM', 'SMALL', 'THUMBNAIL'],
})

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
    t.field('url', {
      type: 'String',
      description:
        'The public s3 url to GET this image. The size by default is LARGE.',
      args: {
        size: 'PhotoSize',
      },
      resolve: async (source, args, ctx) => {
        const key = getImageKey(source.id, args.size || 'LARGE')
        return await getSignedUrl(key)
      },
    })

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
    const promises = args.files.map((file) => uploadFile(file, context.req.app))
    const results = await Promise.allSettled(promises)

    const userId = await getUserId(context)
    if (!userId) {
      throw new Error("user id not found, this shouldn't happen")
    }

    const newPhotos: Prisma.PhotoCreateManyInput[] = []

    for (const result of results) {
      if (result.status === 'rejected') {
        // TODO: do more than just log an error, respond with failed items so
        // client can retry?
        console.error(`Failed to process upload: ${result.reason}`)
        continue
      }

      console.log(result)

      const {
        value: { id, filename, metadata },
      } = result

      const photo: Prisma.PhotoCreateManyInput = {
        id,
        authorId: userId,
        fileName: filename,
        width: metadata.width,
        height: metadata.height,
        size: metadata.size,
        exif: metadata.exif,
        mimetype: metadata.mimetype,
      }

      newPhotos.push(photo)
    }

    const photoIds: string[] = newPhotos
      .map((p) => p.id)
      .filter((id): id is string => id !== undefined)

    try {
      await context.prisma.photo.createMany({ data: newPhotos })
    } catch (e) {
      console.error(e)
    }

    const res = await context.prisma.photo.findMany({
      where: {
        id: {
          in: photoIds,
        },
      },
    })

    return res
  },
})

const Upload: GraphQLScalarType = asNexusMethod(GraphQLUpload, 'upload')

const UploadFile = objectType({
  name: 'UploadFile',
  definition(t) {
    t.string('uri')
    t.string('filename')
  },
})

export { UploadPhoto, Upload, UploadFile, PhotoSize }
