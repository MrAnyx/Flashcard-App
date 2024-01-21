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
    actions: {},
    getters: {
        isAdmin(state) {
            return state.user?.roles.includes("ROLE_ADMIN");
        },
        isUser(state) {
            return state.user?.roles.includes("ROLE_USER");
        },
        getToken(state) {
            return state.user?.token;
        },
        isConnected() {
            return !!this.getToken;
        },
    },
});
