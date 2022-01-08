export interface ImageData {
  uri: string;
  alt?: string;
  width: number;
  height: number;
  aspectRatio: number;
  created: Date;
  resizedDimensions?: {
    width: number;
    height: number;
  };
}

export interface ImageRow {
  images: ImageData[];
  aspectRatio: number;
  height: number;
}

export function getResizedImageDimensions(
  targetHeight: number,
  width: number,
  height: number
): { width: number; height: number } {
  const percentScale = targetHeight / height;

  return {
    width: percentScale * width,
    height: percentScale * height,
  };
}

// Larger the width vs height, the larger the aspect ratio
export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

export function getWidth(aspectRatio: number, height: number): number {
  return height * aspectRatio;
}

export function getHeight(aspectRatio: number, width: number): number {
  return width / aspectRatio;
}
