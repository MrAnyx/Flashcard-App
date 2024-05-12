import type { User } from "~/types/entity";

type State = {
    user: User | null;
};

export const useAuthStore = defineStore("auth", {
    state: (): State => ({
        user: null
    }),
    actions: {
        logout() {
            this.user = null;
        }
    },
    getters: {
        token: (state) => {
            return state.user?.token || null;
        },
        isAdmin(state) {
            return state.user?.roles.includes("ROLE_ADMIN") || false;
        },
        isUser(state) {
            return state.user?.roles.includes("ROLE_USER") || false;
        },
        isConnected() {
            return this.token !== null;
        }
    }
});
