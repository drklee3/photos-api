import { usePhotosQuery } from "../client/reactQuery";
import { useState } from "react";
import { client } from "../client/graphqlClient";

export default function useApiPhotos() {
  const [photos, setPhotos] = useState([]);

  const { data, error, status, refetch } = usePhotosQuery(client);

  return {
    data,
    status,
    error,
  };
}
