import { ImageInfo } from "expo-image-picker";
import { useMutation } from "react-query";

export const uploadFileEndpoint = "http://localhost:4000/photos/upload";

export function useUploadFileMutation() {
  return useMutation<any, any, { img: ImageInfo; albumId?: string }>(
    async (upload) => {
      // Get actual image bytes
      const imgBlob = await fetch(upload.img.uri).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", imgBlob);

      const response = await fetch(uploadFileEndpoint, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      return response.json();
    }
  );
}
