import { NexusGenTypes } from '../schema/generated/schema'

export type PhotoSizeEnum = NexusGenTypes['inputTypeShapes']['PhotoSize']

function sizeToSuffix(size: PhotoSizeEnum): string {
  switch (size) {
    case 'ORIGINAL':
      return 'o'
    case 'FULL':
      return 'f'
    case 'LARGE':
      return 'l'
    case 'MEDIUM':
      return 'm'
    case 'SMALL':
      return 's'
    case 'THUMBNAIL':
      return 't'
  }
}

export function sizeToWidth(size: PhotoSizeEnum): number | null {
  switch (size) {
    case 'ORIGINAL':
      return null
    case 'FULL':
      return null
    case 'LARGE':
      return 1080
    case 'MEDIUM':
      return 800
    case 'SMALL':
      return 400
    case 'THUMBNAIL':
      return 200
  }
}

export function getImageKey(id: string, size: PhotoSizeEnum) {
  const suffix = sizeToSuffix(size)

  return `${id}_${suffix}`
}
