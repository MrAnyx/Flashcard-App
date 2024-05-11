import type { User } from "~/types/entity";

type State = {
    user: User | undefined
}

export const useUserStore = defineStore("user", {
    state: () => ({
        user: undefined
    })
});
