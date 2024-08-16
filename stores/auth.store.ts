import type { User } from "~/types/entity";
import type { SettingName } from "~/types/settings";

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
            useApplicationStore().initialized = false;
            useToken().value = null;

            this.user = undefined;
        },
        login(user: User)
        {
            const token = useToken();
            token.value = user.token;

            this.user = user;
        },
        setSetting(name: SettingName, value: number | string | boolean)
        {
            if (this.user)
            {
                this.user.settings[name] = value;
            }
        },
        getSetting<TValue>(name: SettingName)
        {
            return this.user?.settings[name] as TValue;
        }
    },
    getters: {
        token(state)
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
        isPremium(state)
        {
            return state.user?.premium || false;
        }
    }
});
