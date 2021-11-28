declare module 'exif-reader' {
  interface ExifData {
    image: any
    thumbnail?: any
    exif: any
    gps?: any
    interoperability?: any
  }
  export default function exif(input: any): ExifData
}
