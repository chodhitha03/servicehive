import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { endpoints } from "./endpoints";
import { ApiResponse } from "../types/api";
import { AuthPayload } from "../types/auth";
import { authStorage } from "../utils/auth";

const apiBaseUrl = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15_000
});

const refreshClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15_000
});

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const response = await refreshClient.post<ApiResponse<AuthPayload>>(
    endpoints.auth.refresh,
    { refreshToken }
  );

  const tokens = response.data.data?.tokens;

  if (!tokens) {
    return null;
  }

  authStorage.setAccessToken(tokens.accessToken);
  authStorage.setRefreshToken(tokens.refreshToken);

  return tokens.accessToken;
};

api.interceptors.request.use((config) => {
  const token = authStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api.request(originalRequest);
      }

      authStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default api;