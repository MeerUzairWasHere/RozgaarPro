import axios, { AxiosInstance } from "axios";

import * as SecureStore from "expo-secure-store";

const EXPO_PUBLIC_API_URL = "http://192.168.1.3:3000/api/v1" as const;

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      const response = await axios.post(
        `${EXPO_PUBLIC_API_URL}/auth/refresh-token`,
        {},
        {
          headers: {
            "x-refresh-token": refreshToken,
          },
        }
      );

      const newAccessToken = response.data.accessToken;

      await SecureStore.setItemAsync("accessToken", newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
