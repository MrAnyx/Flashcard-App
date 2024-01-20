import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { HttpCode } from "@/types/response.d";
import router from "./router";

// Set default axios parameters
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Catch request and set Authorization header
instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
        const userStore = useAuthStore();
        const token = userStore.token;

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === HttpCode.UNAUTHORIZED) {
            router.push({ name: "login" });
        } else if (error.response?.status === HttpCode.FORBIDDEN) {
            router.push({ name: "home" });
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;
