// Adds retries to axios

import { AxiosInstance } from "axios";

export const resilience = (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    (v) => Promise.resolve(v),
    async (error) => {
      if (!error.config) {
        console.error("Received network error without axios details", error);
        throw error;
      }

      if (
        error.response &&
        (error.response.status == 400 ||
          error.response.status == 401 ||
          error.response.status == 403)
      ) {
        console.debug("Network request failed but this is ok", {
          config: error.config,
          error,
        });
        throw error;
      }

      if (
        error.response &&
        (error.response.status >= 400 || error.response.status < 500)
      ) {
        // 4xx status means we should not retry.
        console.error("Network request failed", {
          config: error.config,
          error,
        });
        throw error;
      }

      const config = {
        ...error.config,
        timeout: 1000,
        count: (error?.config?.count || 0) + 1,
      };

      if (config.count > 3) {
        const err = new Error(
          "Unable to reach network, gave up after 3 retries. Please restart the app and try again."
        );
        console.error(err, { config: error.config, error });
        throw err;
      }

      console.debug("Retrying due to network error", {
        count: error.config.count,
        error,
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios.request(config).then(resolve).catch(reject);
        }, 1000);
      });
    }
  );
};
