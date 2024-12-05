import axios, { CreateAxiosDefaults } from "axios";
import { notify } from "../../shared/ui/notify";
import keycloak from '../../shared/lib/keycloak.ts';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const baseConfig: CreateAxiosDefaults = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};
const axiosInstance = axios.create(baseConfig);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    notify("error", error.response?.data?.message || "Что-то пошло не так");

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async (config) => {
    if (keycloak.token) {
      const isTokenExpired = keycloak.isTokenExpired();
      if (isTokenExpired) {
        await keycloak.updateToken(30);
      }
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiClient = axiosInstance;
