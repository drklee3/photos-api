import * as React from "react";
import { Box, Flex, HStack } from "native-base";
import GalleryImage from "./GalleryImage";
import { getHeight, ImageData, ImageRow } from "./ImageData";
import { useMeasure } from "react-use";

interface GalleryRowProps {
  width: number;
  row: ImageRow;
}

export default function GalleryRow({
  row: { images, height },
  width,
}: GalleryRowProps) {
  return (
    <HStack height={height} width={width}>
      {images.map((img, index) => (
        <GalleryImage key={index} image={img} rowHeight={height} />
      ))}
    </HStack>
  );
}
