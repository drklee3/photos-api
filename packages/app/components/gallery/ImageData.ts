export interface ImageData {
  uri: string;
  alt?: string;
  width: number;
  height: number;
  aspectRatio: number;
  created: Date;
}

export interface ImageRow {
  images: ImageData[];
  aspectRatio: number;
}
