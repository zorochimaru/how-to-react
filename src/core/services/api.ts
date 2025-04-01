import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores";

export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response } = error;
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // const { data } = await axios.post("/auth/refresh", { refreshToken });
        const data = { accessToken: "token", refreshToken: "refreshToken" };
        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);

        originalRequest.headers!.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Не удалось обновить токен", refreshError);
        useAuthStore.getState().clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
