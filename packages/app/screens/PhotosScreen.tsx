import * as React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { Box, Flex, Text, Heading } from "native-base";
import { RootTabScreenProps } from "../types";
import * as MediaLibrary from "expo-media-library";

interface ImageItemProps {
  asset: MediaLibrary.Asset;
}

function ImageItem({ asset }: ImageItemProps) {
  return (
    <TouchableOpacity key={asset.uri}>
      <View style={styles.imageContainer}>
        <Image
          width={asset.width}
          height={asset.height}
          source={{ uri: asset.uri }}
          style={[styles.image, {}]}
        />
      </View>
    </TouchableOpacity>
  );
}

function SectionHeader() {
  return <Text style={styles.h2}>November</Text>;
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
}: RootTabScreenProps<"Photos">) {
  const [media, setMedia] = React.useState<MediaLibrary.Asset[]>([]);

  const getMedia = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
      sortBy: "creationTime",
    });

    console.log(media);
    let first = await MediaLibrary.getAssetInfoAsync(media.assets[0]);

    console.log(first);

    setMedia(media.assets);
  };

  React.useEffect(() => {
    if (Platform.OS !== "web") {
      getMedia();
    }
  }, []);

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <ImageItem asset={item} />}
      data={media}
      numColumns={4}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingTop: 40,
  },
  h1: {
    fontSize: 40,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 30,
  },
  h3: {
    fontSize: 25,
  },
  h4: {
    fontSize: 18,
  },
  highlight: {
    borderRadius: 16,
    height: 16 * 10,
    width: 9 * 10,
    backgroundColor: "#fff",
  },
  highlightText: {
    color: "#000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  images: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "50%",
  },
  image: {
    width: 100,
    flexGrow: 1,
    height: undefined,
    aspectRatio: 1,
    margin: 6,
    resizeMode: "cover",
  },
});
