import { Box, Flex } from "native-base";
import GalleryImage from "./GalleryImage";
import { ImageData } from "./ImageData";

interface GalleryRowProps {
  imgs: ImageData[];
}

export default function GalleryRow({ imgs }: GalleryRowProps) {
  return (
    <Flex direction="row">
      {imgs.map((img, index) => (
        <GalleryImage key={index} {...img} />
      ))}
    </Flex>
  );
}
