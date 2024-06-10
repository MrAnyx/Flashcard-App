type State = {
    itemsPerPage: number;
};

export const usePaginationStore = defineStore("pagination", {
    persist: true,
    state: (): State => ({
        itemsPerPage: 25
    }),
    actions: {},
    getters: {}
});
