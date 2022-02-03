import Button, { ButtonType } from "./Button";
import ImagePicker from "expo-image-picker";
import "react";
import useToastAlert from "../hooks/useToastAlert";
import { useUploadFileMutation } from "../client/uploadApi";
import pLimit from "p-limit";

const maxConcurrentUploads = 3;

export default function Upload() {
  const toast = useToastAlert();
  // Only on web
  const { mutateAsync, isError, error, reset } = useUploadFileMutation();

  const onPress = async () => {
    const pickerRes = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      exif: true,
    });

    if (pickerRes.cancelled) {
      return;
    }

    try {
      const limit = pLimit(maxConcurrentUploads);

      const uploadTasksAsync = pickerRes.selected.map((img) =>
        limit(() =>
          mutateAsync({
            img,
            // TODO: Upload directly to an album when on album screen and
            // albumId parameter exists
            albumId: undefined,
          })
        )
      );
      const res = await Promise.all(uploadTasksAsync);

      console.log(res);
    } catch (e) {
      console.error(e);
      return;
    }

    toast.show({
      id: "upload:success",
      title: `Uploaded ${pickerRes.selected.length} photos`,
      status: "success",
    });
  };

  if (isError) {
    toast.show({
      id: "upload:failed",
      title: "Upload failed",
      description: `${error}`,
      status: "error",
    });

    reset();
  }

  return (
    <Button type={ButtonType.Primary} onPress={onPress}>
      Upload photos
    </Button>
  );
}
