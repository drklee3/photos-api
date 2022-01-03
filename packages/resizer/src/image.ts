import type { PhotoSize } from '@picatch/client/src/graphqlRequest'

function sizeToSuffix(size: PhotoSize): string | null {
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

  return null
}

export function sizeToWidth(size: PhotoSize): number | null {
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

  return null
}

export function getImageKey(id: string, size: PhotoSize) {
  const suffix = sizeToSuffix(size)

  return `${id}_${suffix}`
}
