import { usePhotosQueryQuery } from "@picatch/client/src/";
import { useState } from "react";
import { client } from "../api/graphqlClient";

export default function useApiPhotos() {
  const [photos, setPhotos] = useState([]);

  const { data, error, status, refetch } = usePhotosQueryQuery(client);

  return {
    data,
    status,
    error,
  };
}
