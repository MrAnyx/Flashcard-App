import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/user.store";
import { HttpCode } from "@/types/response.d";
import router from "@/plugins/router";
import { app } from "@/main";

// Set default axios parameters
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Catch request and set Authorization header
instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
        const userStore = useUserStore();
        const token = userStore.getToken;

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        request.validateStatus = (status: number) => status < 300;

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
            app.config.globalProperties.$toast.add({ severity: "error", summary: "Unauthenticated", detail: "You must authenticated", life: 5000 });
            router.push({ name: "login" });
        } else if (error.response?.status === HttpCode.FORBIDDEN) {
            app.config.globalProperties.$toast.add({ severity: "error", summary: "Forbidden", detail: "Access denied", life: 5000 });
            router.push({ name: "home" });
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;
