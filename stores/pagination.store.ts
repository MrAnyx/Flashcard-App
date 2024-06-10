type State = {
    itemsPerPage: number;
};

export const usePaginationStore = defineStore("pagination", {
    persist: true,
    state: (): State => ({
        itemsPerPage: 5
    }),
    actions: {},
    getters: {}
});
