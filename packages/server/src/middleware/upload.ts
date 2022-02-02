import multer from 'multer'
import type { Express } from 'express'
import { uploadFile } from '../store/uploadFile'
import { retryAsync } from 'ts-retry'
import { log } from '../utils/logger'
import { Prisma } from '.prisma/client'
import { getUserId } from '../utils/getUserId'
import { createContext } from '../context'

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.startsWith('image/') &&
      !file.mimetype.startsWith('video/')
    ) {
      return cb(new Error('File must be an image or video type'))
    }

    cb(null, true)
  },
  limits: {
    // 20 MiB max size
    fileSize: 20 * 1024 * 1024,
    files: 100,
  },
})

export default function installMulterUploads(app: Express) {
  app.post('/photos/upload', upload.single('file'), async (req, res) => {
    if (req.files !== undefined) {
      return res.status(400).send('Must upload a single file, not array')
    }

    if (req.file === undefined) {
      return
    }

    const ctx = createContext(req)
    const userId = await getUserId(ctx)
    if (!userId) {
      throw new Error("user id not found, this shouldn't happen")
    }

    const files = [req.file]

    const promises = files.map((file: Express.Multer.File) =>
      retryAsync(async () => uploadFile(file), {
        delay: 0,
        maxTry: 3,
      }),
    )

    // Actually run the uploads
    let results
    try {
      results = await Promise.all(promises)
    } catch (e) {
      log.error('Failed to upload files', e)

      return res
        .status(500)
        .send({ message: 'Failed to upload images', error: e })
    }

    // Create prisma query data
    const newPhotos = results.map(({ id, filename, metadata }) => {
      // Make id required
      const photo: Omit<Prisma.PhotoCreateManyInput, 'id'> & { id: string } = {
        id,
        authorId: userId,
        fileName: filename,
        width: metadata.width,
        height: metadata.height,
        size: metadata.size,
        exif: metadata.exif,
        mimetype: metadata.mimetype,
      }

      return photo
    })

    try {
      await ctx.prisma.photo.createMany({ data: newPhotos })

      // Also add all photos to album if albumId is provided
      if (req.body.albumId) {
        await ctx.prisma.album.update({
          where: { id: req.body.albumId },
          data: {
            photos: {
              connect: newPhotos.map((p) => ({
                albumId_photoId: {
                  albumId: req.body.albumId,
                  photoId: p.id,
                },
              })),
            },
          },
        })
      }
    } catch (e) {
      console.error(e)
    }

    // Client doesn't need any response
    return res.status(204).send()
  })
}
