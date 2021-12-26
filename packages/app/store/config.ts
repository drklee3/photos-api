import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINT_KEY } from "./keys";

export async function getApiEndpoint(): Promise<string> {
  const endpoint = await AsyncStorage.getItem(API_ENDPOINT_KEY);
  if (!endpoint) {
    return "http://localhost";
  }

  return endpoint;
}
