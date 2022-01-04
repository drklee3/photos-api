export const IMAGE_RESIZE_QUEUE_NAME = 'new_images'

export interface ImageResizeJob {
  id: string
  filename: string
  mimetype: string
}
