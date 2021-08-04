import axios from "axios";
// import { create } from "apisauce";
// import createAuthRefreshInterceptor from "axios-auth-refresh";
import axiosRetry from "axios-retry";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import authStorage from "../auth/storage";
import { getNotificationToken } from "../utilities/notificationTokenStorage";

const baseURL = "https://maralkish.ir";

const client = axios.create({
  baseURL,
  timeout: 10000,
});

const createAxiosResponseInterceptor = () => {
  const interceptor = client.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Reject promise if not 401 error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Remove the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       *
       * Also eject the interceptor to prevent it from working again if the REFRESH request returns 401 too
       */
      axios.interceptors.response.eject(interceptor);
      const refreshToken = await authStorage.getRefreshToken();
      // console.log(refreshToken)
      return client
        .post("/api/store/customers/refresh-token", { token: refreshToken })
        .then(async (response) => {
          await authStorage.setToken(response.data.accessToken);
          await authStorage.setRefreshToken(response.data.refreshToken);
          // TODO: may be have to refresh token here
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.accessToken;
          return axios(error.response.config);
        })
        .catch((error) => {
          console.log("Client : ", error, error.response.config.url);
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
};

createAxiosResponseInterceptor();

client.interceptors.request.use(
  async (config) => {
    // console.log("--------");
    // console.log(config.method, "  ",config.url);
    const notificationToken = await getNotificationToken();
    const token = await authStorage.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (notificationToken) {
      config.headers["notificationToken"] = notificationToken;
    }
    return config;
  },
  (error) => {
    console.log("Error hapened in interceptor");
    Promise.reject(error);
  }
);

// client.addMonitor((r) => console.log(r.status, r.config.url));

axiosRetry(client, { retries: 5, retryDelay: () => 200 });

export { baseURL };
export default client;
