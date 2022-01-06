import * as React from "react";
import { Box, Image } from "native-base";
import { ImageData } from "./ImageData";

export default function GalleryImage({
  uri,
  alt,
  aspectRatio,
  height,
}: ImageData) {
  return (
    <Box width={aspectRatio * height} height={height} flexShrink={1}>
      <Image
        source={{
          uri,
        }}
        alt={alt}
        width={aspectRatio * height}
        height={height}
        resizeMode="contain"
      />
    </Box>
  );
}
