import axios, { CreateAxiosDefaults } from "axios";
import { notify } from "../../shared/ui/notify";

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

export const apiClient = axiosInstance;
