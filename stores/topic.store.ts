import type { Topic } from "~/types/entity";

type State = {
    recents: Topic[];
    topics: Topic[];
    total: number;
    selectedTopic?: Topic;
};

export const useTopicStore = defineStore("topic", {
    persist: {
        pick: ["selectedTopic"]
    },
    state: (): State => ({
        recents: [],
        topics: [],
        total: 0,
        selectedTopic: undefined
    }),
    actions: {
        prepend(item: Topic)
        {
            this.topics = [item, ...this.topics];
            this.increment();
        },
        append(item: Topic)
        {
            this.topics = [...this.topics, item];
            this.increment();
        },
        delete(item: Topic)
        {
            const itemToRemove = this.topics.findIndex(t => t.id === item.id);
            this.topics.splice(itemToRemove, 1);
            this.decrement();
        },
        update(id: number, item: Partial<Topic>)
        {
            const itemToUpdate = this.topics.findIndex(t => t.id === id);
            if (itemToUpdate !== -1)
            {
                const previousItem = this.topics[itemToUpdate];
                this.topics[itemToUpdate] = {
                    ...previousItem,
                    ...item
                };
            }
        },
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
