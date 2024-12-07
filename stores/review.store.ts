type State = {
    total: number;
};

export const useReviewStore = defineStore("review", {
    state: (): State => ({
        total: 0,
    }),
    actions: {
        incrementTotal()
        {
            this.total++;
        },
        decrementTotal()
        {
            this.total--;
        }
    },
    getters: {}
});
