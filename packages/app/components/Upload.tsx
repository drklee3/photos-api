import { useUploadPhotosMutation } from "../client/reactQuery";
import Button, { ButtonType } from "./Button";
import { client } from "../client/graphqlClient";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import useToastAlert from "../hooks/useToastAlert";
import { useQueryClient } from "react-query";
import FileSystem, {
  FileSystemSessionType,
  FileSystemUploadType,
} from "expo-file-system";
import { uploadFileEndpoint } from "../client/uploadApi";
import pLimit from "p-limit";

const maxConcurrentUploads = 3;

export default function Upload() {
  const queryClient = useQueryClient();

  const { mutateAsync, status, isLoading, isError, error, reset } =
    useUploadPhotosMutation(client, {
      onSuccess: () => {
        queryClient.invalidateQueries("photos");
      },
    });

  const toast = useToastAlert();

  const onPress = async () => {
    const pickerRes = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      exif: true,
    });

    if (pickerRes.cancelled) {
      return;
    }

    let res;
    try {
      // Use expo uploader, works in background
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
              // Include auth here
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
      res = await Promise.all(uploadTasksAsync);

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
