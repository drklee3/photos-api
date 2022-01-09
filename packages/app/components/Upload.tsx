import { useUploadPhotosMutation } from "../client/reactQuery";
import Button, { ButtonType } from "./Button";
import { client } from "../client/graphqlClient";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import useToastAlert from "../hooks/useToastAlert";
import { useQueryClient } from "react-query";

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

    const imgBlobPromises = pickerRes.selected.map(async (img) => {
      const res = await fetch(img.uri);
      return await res.blob();
    });

    const imgBlobs = await Promise.all(imgBlobPromises);

    let res;
    try {
      res = await mutateAsync({
        files: imgBlobs,
      });

      console.log(res);
    } catch (e) {
      console.error(e);
      return;
    }

    toast.show({
      id: "upload:success",
      title: `Uploaded ${res.uploadPhotos.length} photos`,
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
