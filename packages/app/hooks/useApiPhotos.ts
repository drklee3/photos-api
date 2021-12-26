import { usePhotosQueryQuery } from "../client/reactQuery";
import { useState } from "react";
import { client } from "../client/graphqlClient";

export default function useApiPhotos() {
  const [photos, setPhotos] = useState([]);

  const { data, error, status, refetch } = usePhotosQueryQuery(client);

  return {
    data,
    status,
    error,
  };
}
