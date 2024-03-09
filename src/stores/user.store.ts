import { User } from "@/types/user";
import { defineStore } from "pinia";
import { Nullable } from "primevue/ts-helpers";

export type State = {
    user: Nullable<User>;
};

export const useUserStore = defineStore("user", {
    persist: true,
    state: (): State => ({
        user: null,
    }),
    actions: {
        logout() {
            this.user = null;
        },
    },
    getters: {
        isAdmin(state) {
            return state.user?.roles.includes("ROLE_ADMIN") || false;
        },
        isUser(state) {
            return state.user?.roles.includes("ROLE_USER") || false;
        },
        getToken(state) {
            return state.user?.token || null;
        },
        isConnected() {
            return !!this.getToken;
        },
    },
});
