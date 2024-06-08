import type { Topic } from "~/types/entity";

type State = {
    recents: Topic[];
};

export const useTopicStore = defineStore("topic", {
    state: (): State => ({
        recents: []
    }),
    actions: {},
    getters: {}
});
