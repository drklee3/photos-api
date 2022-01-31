import React, { useEffect, useMemo, useRef } from "react";
import {
  SectionList,
  Heading,
  Center,
  NativeBaseProvider,
  Box,
  HStack,
  FlatList,
  Image,
  VStack,
  Text,
} from "native-base";
import {
  Animated,
  FlatList as RNFlatList,
  useWindowDimensions,
} from "react-native";
import GalleryRow from "./GalleryRow";
import {
  getAspectRatio,
  getHeight,
  getResizedImageDimensions,
  getWidth,
  ImageData,
  ImageRow,
} from "./ImageData";
import { useMeasure, useWindowSize } from "react-use";
import ScrollBar from "./ScrollBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootTabScreenProps } from "../../types";
import Button, { ButtonType } from "../Button";

function calculateRowItems(
  rowWidth: number,
  minRowAspectRatio: number,
  imgs: ImageData[]
): ImageRow[] {
  const rows: ImageRow[] = [];
  let curRow: ImageData[] = [];

  let rowAspectRatio = 0;

  for (const [i, img] of imgs.entries()) {
    curRow.push(img);

    // Compute aspect ratio
    rowAspectRatio += getAspectRatio(img.width, img.height);

    // If exceeds min aspect ratio or if we're on the last image
    if (rowAspectRatio > minRowAspectRatio || i + 1 == imgs.length) {
      // Make sure last row has the same aspect ratio
      rowAspectRatio = Math.max(rowAspectRatio, minRowAspectRatio);

      const rowHeight = getHeight(rowAspectRatio, rowWidth);
      console.log("rowWidth", rowWidth, "rowHeight", rowHeight);

      curRow = curRow.map((img) => {
        const imageAspectRatio = getAspectRatio(img.width, img.height);
        const width = getWidth(imageAspectRatio, rowHeight);
        const height = getHeight(imageAspectRatio, width);

        console.log("imageAspectRatio", imageAspectRatio);
        console.log("width", width, "height", height);

        return {
          ...img,
          resizedDimensions: {
            width,
            height,
          },
        };
      });

      console.log("resized images", curRow);

      rows.push({
        images: curRow,
        aspectRatio: rowAspectRatio,
        height: rowHeight,
      });

      // Reset curRow
      curRow = [];
      rowAspectRatio = 0;
    }
  }

  return rows;
}

type GroupedImageList = { [key: string]: ImageData[] };

function groupImagesByMonth(imgs: ImageData[]): GroupedImageList {
  // Assuming images are in order
  const imgsByMonth: GroupedImageList = {};

  for (const img of imgs) {
    const sectionTitle = img.created.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (imgsByMonth[sectionTitle] === undefined) {
      imgsByMonth[sectionTitle] = [];
    }

    imgsByMonth[sectionTitle].push(img);
  }

  return imgsByMonth;
}

interface GallerySection {
  title: string;
  data: ImageRow[];
}

interface GalleryProps {
  imageList: ImageData[];
  minRowAspectRatio: number;
  activeImageId?: string;
  route: RootTabScreenProps<"Photos">["route"];
}

export default function Gallery({
  imageList,
  minRowAspectRatio,
  route,
}: GalleryProps) {
  // Measure just an empty box to get the width
  const [ref, { width }] = useMeasure();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Nativebase doesn't have the method types apparently and can't use FlatList as type here
  const flatlistRef = useRef<RNFlatList>();
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const { navigate } = useNavigation();

  // -------------------------------------------------
  // Gallery sections
  const sections: GallerySection[] = useMemo(() => {
    const groupedImages = groupImagesByMonth(imageList);

    return Object.entries(groupedImages).map(([title, imgs]) => {
      const rows = calculateRowItems(width, minRowAspectRatio, imgs);
      return {
        title,
        data: rows,
      };
    });
  }, [imageList, width]);

  // -------------------------------------------------
  // Single photo view

  // Mapping from photo ID to index in the list, used for single photo view scrollToIndex
  const imageIndexMap = useMemo(() => {
    const map: { [id: string]: number } = {};

    for (const [i, img] of imageList.entries()) {
      map[img.id] = i;
    }

    return map;
  }, [imageList]);

  const scrollToId = (id?: string) => {
    if (id) {
      const index = imageIndexMap[id];

      // Don't use falsey check as 0 is still a valid index
      if (index === undefined) {
        return;
      }

      console.log(`route.params.id ${id} changed, scrolling to index ${index}`);

      flatlistRef.current?.scrollToIndex({
        index,
      });
    }
  };

  useEffect(() => {
    scrollToId(route.params?.id);
  }, [route.params]);

  // Only updates url param, side effect listens for route parameter changes
  const onImageClick = (imageId: string) => {
    navigate("Root", {
      screen: "Photos",
      params: {
        id: imageId,
      },
      path: `/photos/${imageId}`,
    });
  };

  // Just removes the image ID param
  const closeSinglePhoto = () => {
    navigate("Root", {
      screen: "Photos",
      params: {},
      path: `/photos`,
    });
  };

  const updateImageIndex = (diff: number) => {
    if (!route.params?.id) {
      return;
    }

    const currentIndex = imageIndexMap[route.params?.id];

    if (currentIndex === undefined) {
      return;
    }

    const nextIndex = currentIndex + diff;

    if (nextIndex < 0 || nextIndex >= imageList.length) {
      return;
    }

    const nextImageId = imageList[nextIndex].id;

    navigate("Root", {
      screen: "Photos",
      params: {
        id: nextImageId,
      },
      path: `/photos/${nextImageId}`,
    });
  };

  const prevImage = () => {
    updateImageIndex(-1);
  };

  const nextImage = () => {
    updateImageIndex(1);
  };

  return (
    <HStack flex={1}>
      <Box flexGrow={1} flex={1}>
        <Box ref={ref} width="100%"></Box>
        <SectionList
          zIndex={0}
          mb="4"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
            { useNativeDriver: false }
          )}
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={(data) => (
            <GalleryRow
              row={data.item}
              width={width}
              onImageClick={onImageClick}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Box my="2">
              <Heading fontWeight="normal" size="md" fontFamily="Poppins">
                {title}
              </Heading>
            </Box>
          )}
          ListEmptyComponent={<Center>Hmm there's nothing here</Center>}
        />
        <VStack
          width={windowWidth}
          height={windowHeight}
          display={route.params?.id === undefined ? "none" : "flex"}
          zIndex={3}
          position="fixed"
          top={0}
          left={0}
          backgroundColor="gray.800"
          alignItems="center"
          flexGrow={1}
        >
          <HStack>
            <Button type={ButtonType.Primary} onPress={closeSinglePhoto}>
              Close
            </Button>
            <Button type={ButtonType.Primary} onPress={prevImage}>
              Previous
            </Button>
            <Button type={ButtonType.Primary} onPress={nextImage}>
              Next
            </Button>
          </HStack>
          <FlatList
            flex={1}
            width="full"
            data={imageList}
            pagingEnabled={true}
            horizontal={true}
            ref={flatlistRef}
            onContentSizeChange={() => {
              // Scroll to the image on load if one is selected,
              // initialScrollIndex doesn't work here
              scrollToId(route.params?.id);
            }}
            getItemLayout={(data, index) => ({
              index,
              offset: windowWidth * index,
              length: windowWidth,
            })}
            CellRendererComponent={(d) => {
              // Force the item to be full height
              return <Box {...d} flexGrow={1} />;
            }}
            renderItem={(d) => (
              <Box
                width={windowWidth}
                height="full"
                padding={2}
                borderColor="white"
                borderWidth={4}
                flex={1}
                flexDirection="column"
              >
                <Text>{d.item.id}</Text>
                <Box width="full" flexGrow={1}>
                  <Image
                    source={{
                      uri: d.item.uri,
                    }}
                    alt={d.item.id}
                    width="100%"
                    height="100%"
                    flexGrow={1}
                    resizeMode="contain"
                  />
                </Box>
              </Box>
            )}
          />
        </VStack>
      </Box>
      <ScrollBar value={scrollIndicator} />
    </HStack>
  );
}
