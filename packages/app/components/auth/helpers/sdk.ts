import { Configuration, V0alpha2Api } from "@ory/kratos-client";
import Constants from "expo-constants";
import axiosFactory from "axios";
import { resilience } from "./axios";
import { Platform } from "react-native";

const axios = axiosFactory.create();
resilience(axios); // Adds retry mechanism to axios

// canonicalize removes the trailing slash from URLs.
const canonicalize = (url: string = "") => url.replace(/\/+$/, "");

// This value comes from ../../app.config.js
export const getKratosUrl = (project: string = "playground") => {
  const url =
    canonicalize(Constants.manifest?.extra?.kratosUrl) ||
    "https://playground.projects.oryapis.com";

  return url;
};

export const newKratosSdk = (project: string) => {
  const kratosUrl = getKratosUrl(project);
  console.log("using kratos url", kratosUrl);

  return new V0alpha2Api(
    new Configuration({
      basePath: kratosUrl,
      baseOptions: {
        // Setting this is very important as axios will send the CSRF cookie otherwise
        // which causes problems with ORY Kratos' security detection.
        withCredentials: Platform.OS === "web",

        // Timeout after 5 seconds.
        timeout: 10000,
      },
    }),
    "",
    // Ensure that we are using the axios client with retry.
    axios
  );
};
