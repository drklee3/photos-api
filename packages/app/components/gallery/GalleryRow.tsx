import * as React from "react";
import { Box, Flex, HStack } from "native-base";
import GalleryImage from "./GalleryImage";
import { ImageData, ImageRow } from "./ImageData";
import { useMeasure } from "react-use";

interface GalleryRowProps {
  width: number;
  row: ImageRow;
}

export default function GalleryRow({
  row: { images, aspectRatio },
  width,
}: GalleryRowProps) {
  const height = width * aspectRatio;

  console.log("width, height, aspect ratio", width, height, aspectRatio);

  return (
    <HStack height={height} width={width}>
      {images.map((img, index) => (
        <GalleryImage key={index} {...img} height={height} />
      ))}
    </HStack>
  );
}
