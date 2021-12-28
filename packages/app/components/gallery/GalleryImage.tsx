import * as React from "react";
import { Image } from "native-base";
import { ImageData } from "./ImageData";

export default function GalleryImage({ uri, alt, width, height }: ImageData) {
  return (
    <Image
      source={{
        uri,
      }}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
