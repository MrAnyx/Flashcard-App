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
            token.value = null;

            this.user = undefined;
        },
        login(user: User)
        {
            const token = useToken();
            token.value = user.token;

            this.user = user;
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
