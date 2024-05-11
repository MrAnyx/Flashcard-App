import type { User } from "~/types/entity";

type State = {
    user: User | undefined
}

export const useAuthStore = defineStore("auth", {
    state: (): State => ({
        user: undefined
    })
});
