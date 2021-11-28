import * as React from "react";
import {
  StyleSheet,
  Image,
  SectionList,
  TouchableOpacity,
  SectionListData,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import * as MediaLibrary from "expo-media-library";

interface ImageItemProps {
  asset: MediaLibrary.Asset;
}

function ImageItem({ asset }: ImageItemProps) {
  return (
    <TouchableOpacity key={asset.uri}>
      <Image
        width={asset.width}
        height={asset.height}
        source={{ uri: asset.uri }}
        style={[styles.image, {}]}
      />
    </TouchableOpacity>
  );
}

function SectionHeader() {
  return <Text style={styles.h2}>November</Text>;
}

function renderHeader() {
  return (
    <>
      <Text style={styles.h1}>Photos</Text>
      <View style={styles.highlight}>
        <Text style={[styles.h4, styles.highlightText]}>Recent Highlights</Text>
      </View>
    </>
  );
}

export default function PhotosScreen({
  navigation,
}: RootTabScreenProps<"Photos">) {
  const [media, setMedia] = React.useState<
    SectionListData<MediaLibrary.Asset>[]
  >([]);

  const getMedia = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
      sortBy: "creationTime",
    });

    console.log(media);
    let first = await MediaLibrary.getAssetInfoAsync(media.assets[0]);

    console.log(first);

    setMedia([{ data: media.assets }]);
  };

  React.useEffect(() => {
    getMedia();
  }, []);

  return (
    <SectionList
      style={styles.container}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <ImageItem asset={item} />}
      renderSectionHeader={({ section }) => <SectionHeader />}
      sections={media}
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
  image: {
    minWidth: 100,
    minHeight: 100,
    margin: 6,
    resizeMode: "cover",
  },
});
