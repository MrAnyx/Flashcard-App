import axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "@/services/authentication";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { ErrorFormat } from "@/types/format";

// Set default axios parameters
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Catch request and set Authorization header
instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
        const token = getToken();

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
