import * as React from "react";
import { Box, Image } from "native-base";
import { getWidth, ImageData } from "./ImageData";

export interface GalleryImageProps {
  image: ImageData;
  rowHeight: number;
}

export default function GalleryImage({
  image: { uri, alt, resizedDimensions },
  rowHeight,
}: GalleryImageProps) {
  // This shouldn't happen
  if (!resizedDimensions) {
    return null;
  }

  const { width, height } = resizedDimensions;

  return (
    <Box width={width} height={height}>
      <Image
        source={{
          uri,
        }}
        alt={alt}
        width={width}
        height={height}
        resizeMode="contain"
      />
    </Box>
  );
}
