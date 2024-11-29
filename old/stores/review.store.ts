type State = {
    total: number;
};

export const useReviewStore = defineStore("review", {
    state: (): State => ({
        total: 0,
    }),
    actions: {
        increment()
        {
            this.total++;
        },
        decrement()
        {
            this.total--;
        }
    },
    getters: {}
});
