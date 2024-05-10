type State = {
    user: object | undefined
}

export const useUserStore = defineStore("user", {
    state: () => ({
        user: undefined
    })
});
