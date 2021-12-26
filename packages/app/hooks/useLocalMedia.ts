import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";

export default function useLocalMedia() {
  const [media, setMedia] = useState<MediaLibrary.Asset[]>([]);
  const [shouldAsk, setShouldAsk] = useState(true);
  const [permissionStatus, setPermissionStatus] =
    useState<MediaLibrary.PermissionStatus | null>(null);

  const getMedia = async () => {
    if (!shouldAsk) {
      return;
    }

    let { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
      sortBy: "creationTime",
    });

    // let first = await MediaLibrary.getAssetInfoAsync(media.assets[0]);

    setMedia(media.assets);
    setShouldAsk(canAskAgain);
    setPermissionStatus(status);
  };

  useEffect(() => {
    if (Platform.OS !== "web") {
      getMedia();
    }
  }, []);

  return {
    media,
    permissionStatus,
  };
}
