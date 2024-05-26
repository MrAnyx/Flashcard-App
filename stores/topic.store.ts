import type { Topic } from "~/types/entity";

type State = {
    topics: Topic[];
    recents: Topic[];
};

export const useTopicStore = defineStore("topic", {
    state: (): State => ({
        topics: [],
        recents: []
    }),
    actions: {},
    getters: {
        total: (state) => {
            return state.topics.length;
        }
    }
});
