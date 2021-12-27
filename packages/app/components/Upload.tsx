import { useUploadPhotosMutationMutation } from "../client/reactQuery";
import Button, { ButtonType } from "./Button";
import { client } from "../client/graphqlClient";
import * as ImagePicker from "expo-image-picker";
import { Text, useToast } from "native-base";

const TOAST_ID_MEDIA_LIBRARY = "toast_media_library";
const TOAST_ID_UPLOAD_FAILED = "toast_upload_failed";

export default function Upload() {
  const { mutateAsync, status, isLoading, isError, error, reset } =
    useUploadPhotosMutationMutation(client);

  const toast = useToast();

  const onPress = async () => {
    const cameraRollStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraRollStatus.status !== "granted") {
      if (!toast.isActive(TOAST_ID_MEDIA_LIBRARY)) {
        toast.show({
          id: TOAST_ID_MEDIA_LIBRARY,
          title: "Media library permissions denied",
          status: "warning",
        });
      }

      return;
    }

    const pickerRes = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      base64: true,
      exif: true,
    });

    if (pickerRes.cancelled) {
      return;
    }

    const res = await mutateAsync({
      files: pickerRes.selected.map((img) => fetchImageFromUri(img.uri)),
    });
  };

  if (isError) {
    if (!toast.isActive(TOAST_ID_MEDIA_LIBRARY)) {
      toast.show({
        id: TOAST_ID_MEDIA_LIBRARY,
        title: "Upload failed",
        description: `${error}`,
        status: "error",
      });
    }

    reset();
  }

  return (
    <Button type={ButtonType.Primary} onPress={onPress}>
      Upload photos
    </Button>
  );
}

async function fetchImageFromUri(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}
