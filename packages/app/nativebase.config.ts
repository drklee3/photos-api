import {
  INativebaseConfig,
  NativeBaseProvider,
  extendTheme,
} from "native-base";

export const config: INativebaseConfig = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins_100Thin",
        italic: "Poppins_100Thin_Italic",
      },
      200: {
        normal: "Poppins_200ExtraLight",
        italic: "Poppins_200ExtraLight_Italic",
      },
      300: {
        normal: "Poppins_300Light",
        italic: "Poppins_300Light_Italic",
      },
      400: {
        normal: "Poppins_400Regular",
        italic: "Poppins_400Regular_Italic",
      },
      500: {
        normal: "Poppins_500Medium",
        italic: "Poppins_500Medium_Italic",
      },
      600: {
        normal: "Poppins_600SemiBold",
        italic: "Poppins_600SemiBold_Italic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
  colors: {
    // Add new color
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});
