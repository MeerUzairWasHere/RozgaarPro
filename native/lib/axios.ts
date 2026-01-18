import axios, { AxiosInstance } from "axios";
import * as Sentry from "@sentry/react-native";

import * as SecureStore from "expo-secure-store";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ---- AUTH TOKEN EXPIRED FLOW ----
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!refreshToken) {
          // ❌ Expected state → user logged out
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${EXPO_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          {
            headers: {
              "x-refresh-token": refreshToken,
            },
          },
        );

        const newAccessToken = response.data.accessToken;

        await SecureStore.setItemAsync("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // 🔥 THIS is where Sentry belongs
        Sentry.captureException(refreshError, {
          tags: {
            layer: "axios",
            type: "refresh-token-failed",
          },
          extra: {
            url: originalRequest?.url,
          },
        });

        return Promise.reject(refreshError);
      }
    }

    // ❌ Do NOT log other errors here
    return Promise.reject(error);
  },
);
