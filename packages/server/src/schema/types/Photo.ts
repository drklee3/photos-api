import { enumType, objectType } from 'nexus'
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

export { PhotoSize }
