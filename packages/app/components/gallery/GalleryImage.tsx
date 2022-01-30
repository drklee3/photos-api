import * as React from "react";
import { Box, Image, Pressable } from "native-base";
import { getWidth, ImageData } from "./ImageData";
import { useNavigation } from "@react-navigation/core";
import { useLinkProps } from "@react-navigation/native";

export interface GalleryImageProps {
  image: ImageData;
  rowHeight: number;
  onImageClick: (imageId: string) => void;
}

export default function GalleryImage({
  image: { id, uri, alt, resizedDimensions },
  rowHeight,
  onImageClick,
}: GalleryImageProps) {
  // This shouldn't happen
  if (!resizedDimensions) {
    return null;
  }

  const { width, height } = resizedDimensions;

  return (
    <Box width={width} height={height}>
      <Pressable onPress={() => onImageClick(id)}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.97 : 1,
                  },
                ],
              }}
            >
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
        }}
      </Pressable>
    </Box>
  );
}
