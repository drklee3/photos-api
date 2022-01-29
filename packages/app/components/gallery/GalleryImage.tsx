import * as React from "react";
import { Box, Image, Pressable } from "native-base";
import { getWidth, ImageData } from "./ImageData";
import { useNavigation } from "@react-navigation/core";
import { useLinkProps } from "@react-navigation/native";

export interface GalleryImageProps {
  image: ImageData;
  rowHeight: number;
}

export default function GalleryImage({
  image: { id, uri, alt, resizedDimensions },
  rowHeight,
}: GalleryImageProps) {
  // This shouldn't happen
  if (!resizedDimensions) {
    return null;
  }

  const { onPress, ...linkProps } = useLinkProps({
    to: {
      screen: "Root",
      params: {
        screen: "Photos",
        params: {
          id,
        },
        path: `/photos/${id}`,
      },
    },
  });

  const { width, height } = resizedDimensions;

  return (
    <Box width={width} height={height}>
      <Pressable onPress={onPress}>
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
