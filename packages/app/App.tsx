import { StatusBar } from "expo-status-bar";
import React, { createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "react-query";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { config, theme } from "./nativebase.config";
import useAuth, { AuthContext } from "./hooks/useAuth";

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const authContextData = useAuth();

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={authContextData}>
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <NativeBaseProvider config={config} theme={theme}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </NativeBaseProvider>
          </QueryClientProvider>
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
