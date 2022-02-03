import "react";
import { HStack } from "native-base";
import GalleryImage from "./GalleryImage";
import { ImageRow } from "./ImageData";

interface GalleryRowProps {
  width: number;
  row: ImageRow;
  onImageClick: (imageId: string) => void;
}

export default function GalleryRow({
  row: { images, height },
  width,
  onImageClick,
}: GalleryRowProps) {
  return (
    <HStack height={height} width={width}>
      {images.map((img, index) => (
        <GalleryImage
          key={index}
          image={img}
          rowHeight={height}
          onImageClick={onImageClick}
        />
      ))}
    </HStack>
  );
}
