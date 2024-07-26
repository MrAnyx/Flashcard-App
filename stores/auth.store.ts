import type { User } from "~/types/entity";

type State = {
    user?: User;
};

export const useAuthStore = defineStore("auth", {
    state: (): State => ({
        user: undefined
    }),
    actions: {
        logout()
        {
            const token = useToken();
            this.user = undefined;
            token.value = null;
        },
        login(user: User)
        {
            const token = useToken();
            this.user = user;
            token.value = user.token;
        },
    },
    getters: {
        token: (state) =>
        {
            return state.user?.token || null;
        },
        isAdmin(state)
        {
            return state.user?.roles.includes("ROLE_ADMIN") || false;
        },
        isUser(state)
        {
            return state.user?.roles.includes("ROLE_USER") || false;
        },
        isConnected()
        {
            return this.token !== null;
        },
        isPremium()
        {
            return true;
        }
    }
});
