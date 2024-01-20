import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { LoginResponse } from "@/types/auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: useLocalStorage<string>("token", null),
    }),
    actions: {
        async isTokenValid() {
            const response = await axios.get("/users/me");
            return response.status === 200;
        },
        async login(identifier: string, password: string) {
            const response = await axios.post<LoginResponse>("/auth/login", {
                identifier,
                password,
            });

            if (response.status === 200) {
                this.token = response.data.token;
            }
        },
    },
    getters: {
        isConnected: (state) => {
            return state.token;
        },
    },
});
