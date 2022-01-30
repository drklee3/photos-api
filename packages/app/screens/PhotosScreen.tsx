import * as React from "react";

import { client } from "../client/graphqlClient";
import { usePhotosQuery } from "../client/reactQuery";
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  Spinner,
  Center,
} from "native-base";
import { RootTabScreenProps } from "../types";
import * as MediaLibrary from "expo-media-library";
import useLocalMedia from "../hooks/useLocalMedia";
import Gallery from "../components/gallery/Gallery";
import { ImageData } from "../components/gallery/ImageData";
import Button, { ButtonType } from "../components/Button";
import Upload from "../components/Upload";
import LogOut from "../components/auth/LogOut";

interface ImageItemProps {
  asset: MediaLibrary.Asset;
}

function renderHeader() {
  return (
    <>
      <Heading size="xl">Photos</Heading>
      <Flex direction="row" mb="2.5" mt="1.5">
        <Box
          w="90"
          h="160"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          bg={{
            linearGradient: {
              colors: ["lightBlue.300", "violet.800"],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          _text={{
            fontSize: "md",
            color: "warmGray.50",
          }}
        >
          Recent Highlights
        </Box>
      </Flex>
    </>
  );
}

export default function PhotosScreen({
  navigation,
  route,
}: RootTabScreenProps<"Photos">) {
  const { media, permissionStatus } = useLocalMedia();

  const images: ImageData[] = media.map((m) => {
    return {
      id: m.uri,
      uri: m.uri,
      alt: m.filename,
      width: m.width,
      height: m.height,
      created: new Date(m.creationTime),
    };
  });

  const { data, error, status, refetch } = usePhotosQuery(client);

  const apiImages: ImageData[] | undefined = data?.photos.map((photo) => {
    return {
      id: photo.id,
      uri: photo.url,
      alt: photo.fileName || undefined,
      width: photo.width,
      height: photo.height,
      aspectRatio: photo.width / photo.height,
      created: new Date(photo.createdAt),
    };
  });

  return (
    <VStack p="4" flex={1}>
      <Heading fontWeight="normal" size="xl" fontFamily="Poppins">
        Photos
      </Heading>
      <LogOut />
      <Upload />
      {status === "loading" && (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading photos" />
          <Heading fontSize="md">Loading...</Heading>
        </HStack>
      )}
      {apiImages && (
        <Gallery
          route={route}
          imageList={apiImages}
          minRowAspectRatio={2}
          activeImageId={route.params.id}
        />
      )}
    </VStack>
  );
}
