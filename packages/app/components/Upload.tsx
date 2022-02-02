import Button, { ButtonType } from "./Button";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import useToastAlert from "../hooks/useToastAlert";
import FileSystem, {
  FileSystemSessionType,
  FileSystemUploadType,
} from "expo-file-system";
import { uploadFileEndpoint, useUploadFileMutation } from "../client/uploadApi";
import pLimit from "p-limit";
import { Platform } from "react-native";

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
      if (Platform.OS === "web") {
        // WEB upload
        const limit = pLimit(maxConcurrentUploads);

        const uploadTasksAsync = pickerRes.selected.map((img) =>
          limit(() =>
            mutateAsync({
              img,
              // TODO: Upload directly to an album
              albumId: undefined,
            })
          )
        );
        const res = await Promise.all(uploadTasksAsync);

        console.log(res);
      } else {
        // Use expo uploader on mobile, works in background
        const uploadTasks = pickerRes.selected.map((img) => {
          const task = FileSystem.createUploadTask(
            uploadFileEndpoint,
            img.uri,
            {
              uploadType: FileSystemUploadType.MULTIPART,
              fieldName: "file",
              sessionType: FileSystemSessionType.BACKGROUND,
              parameters: {
                // TODO: Upload directly to an album
                // albumId: ""
              },
              headers: {
                // TODO: Include auth here
              },
            },
            (progress) => {
              const progressPercent =
                progress.totalByteSent / progress.totalBytesExpectedToSend;
            }
          );

          return task;
        });
        // Limit concurrent uploads
        const limit = pLimit(maxConcurrentUploads);

        const uploadTasksAsync = uploadTasks.map((task) =>
          limit(() => task.uploadAsync())
        );
        const res = await Promise.all(uploadTasksAsync);

        console.log(res);
      }
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
