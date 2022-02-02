import { ImageInfo } from "expo-image-picker";
import { Platform } from "react-native";
import { useMutation } from "react-query";
import { useAuthContext } from "../components/auth/AuthProvider";
import FileSystem, {
  FileSystemSessionType,
  FileSystemUploadType,
} from "expo-file-system";

export const uploadFileEndpoint = "http://localhost:4000/photos/upload";

export function useUploadFileMutation() {
  const {
    state: { session },
  } = useAuthContext();

  return useMutation<any, any, { img: ImageInfo; albumId?: string }>(
    async (upload) => {
      if (Platform.OS === "web") {
        // Get actual image bytes
        const imgBlob = await fetch(upload.img.uri).then((res) => res.blob());

        const formData = new FormData();
        formData.append("file", imgBlob);

        const response = await fetch(uploadFileEndpoint, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        return response;
      } else {
        if (!session?.session_token) {
          throw new Error("No session token found");
        }

        // Mobile
        const task = FileSystem.createUploadTask(
          uploadFileEndpoint,
          upload.img.uri,
          {
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "file",
            sessionType: FileSystemSessionType.BACKGROUND,
            parameters: {
              // TODO: Upload directly to an album
              ...(upload.albumId !== undefined && { albumId: upload.albumId }),
            },
            headers: {
              Authorization: `Bearer ${session.session_token}`,
            },
          },
          (progress) => {
            const progressPercent =
              progress.totalByteSent / progress.totalBytesExpectedToSend;
          }
        );

        return task.uploadAsync();
      }
    }
  );
}
